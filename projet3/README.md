# 💬 Chat App — Mini Projet

Cette application est un système de chat en temps réel avec authentification via **email**, **Google** ou **GitHub**. Elle est construite avec :

- **Vue.js** pour le frontend
- **Node.js** / **Express** / **Passport.js** pour l'API backend
- **MongoDB** pour le stockage des utilisateurs et des messages
- **Redis** pour la gestion des sessions et l'optimisation

---

## ⚙️ Prérequis

### 1. Base de données MongoDB

Vous devez disposer d'une base MongoDB accessible (locale ou via un service comme MongoDB Atlas).

### 2. Serveur Redis

Un serveur Redis doit être en cours d'exécution pour gérer les sessions utilisateur.

---

## 🔐 Configuration

Modifier le fichier `.env` dans le dossier `backend/`.

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
MONGO_URI=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

* lancer `npm start` dans le dossier backend pour lancer le serveur sur le port 5000.
* lancer `npm run dev` dans le dossier frontend pour lancer le serveur sur le port 5173.
