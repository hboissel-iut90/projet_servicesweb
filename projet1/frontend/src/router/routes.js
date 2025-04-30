import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import HomeView from "@/components/HomeView.vue";
import LoginForm from "@/components/LoginForm";
import ErrorDialog from "@/components/ErrorDialog.vue";
import SignupForm from "@/components/SignupForm.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            central: HomeView
        },
    },
    {
        path: '/login',
        name: 'login',
        components: {
            central: LoginForm
        },
    },
    {
        path: '/signup',
        name: 'signup',
        components: {
            central: SignupForm
        },
    },
    // fallback route when no other matches => error
    {
        path: '*',
        name: 'error404',
        components: {
            central: ErrorDialog
        }
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function checkAccess(to) {
    // BEWARE: routes without a meta levelAuth field are considered to be public
    return !((to.meta.levelAuth) && (to.meta.levelAuth === 1) && (store.state.auth === false));
}

// check for all routes needing privileges that user is authenticated
router.beforeEach((to, from, next) => {
    if (to.name === 'error404') {
        store.commit('errors/pushError', 'Invalid route')
        next('/')
    } else if (checkAccess(to)) {
        next()
    } else {
        store.commit('errors/pushError', 'You need to login')
        next('/login');
    }
});


export default router