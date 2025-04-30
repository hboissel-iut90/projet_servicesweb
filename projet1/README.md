# Projet 1 : Passport
### Groupe de S4-A composé de Nathan Ponthieu et de Harry Boisselot

## Project setup

### Installer les dépendances avec la commande ci-dessous dans {votre_dossier_racine}/projet1/frontend ainsi que dans {votre_dossier_racine}/projet1/backend
```
npm i
```

### Lancer le backend et le frontend avec les commandes suivants :
Pour le frontend :
```
npm run serve
```
Pour le backend :
```
node server.js
```

### Puis aller dans le fichier {votre_dossier_racine}/projet1/backend/config/config.js
### pour ensuite entrer votre nom d'utilisateur et votre mot de passe de votre base de données 
### (vous devrez aussi changer le nom de la base de données si elle se nomme différemment)


```
{
    "development": {
        "username": "",                  <- Entrer votre nom d'utilisateur 
        "password": "",                  <- Entrer votre mot de passe
        "database": "bd_passportlocal",  <- Ici, changer le nom de la base de données que vous utiliserez
        "host": "localhost",
        "port": 5432,
        "dialect": "postgres"
    },
    "test": {},
    "production": {}
}
```
