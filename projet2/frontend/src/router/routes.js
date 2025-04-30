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
        meta: { levelAuth: true }
    },
    {
        path: '/signin',
        name: 'signin',
        components: {
            central: SignupForm
        },
        meta: { levelAuth: true }
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
    return !((to.meta.levelAuth) && (to.meta.levelAuth === true) && (store.state.auth === true));
}

// check for all routes needing privileges that user is authenticated
router.beforeEach((to, from, next) => {
    if (checkAccess(to)) {
        next()
    } else {
        next('/');
    }
});


export default router