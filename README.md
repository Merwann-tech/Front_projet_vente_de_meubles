# Meuble&Co

Bienvenue sur **Meuble&Co**, la plateforme de revente de meubles d'occasion entre particuliers et professionnels. Donnez une seconde vie à vos meubles, dénichez des pépites et faites des économies tout en préservant la planète !

## 🚀 Fonctionnalités

- **Consultation d'annonces** : Parcourez une large sélection de meubles pour tous les styles et budgets.
- **Dépôt d'annonces** : Mettez en vente vos meubles simplement et rapidement.
- **Authentification** : Créez un compte pour gérer vos annonces et vos favoris.
- **Gestion utilisateur** : Tableau de bord pour gérer vos annonces publiées.
- **Modération** : Interface dédiée pour la gestion des contenus (pour les modérateurs).
- **Paiement sécurisé** : Intégration avec Stripe pour les transactions.

## 🛠 Technologies utilisées

Ce projet est construit avec les technologies modernes suivantes :

- **Framework** : [Next.js 16](https://nextjs.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **UI/Styling** : [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Paiement** : [Stripe](https://stripe.com/)

## 📦 Installation

Pour installer et lancer le projet localement, suivez ces étapes :

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/Merwann-tech/Front_projet_vente_de_meubles.git
   cd Front_projet_vente_de_meubles
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env.local` à la racine du projet et ajoutez les variables nécessaires (par exemple pour l'API backend, Stripe, etc.).

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## 📂 Structure du projet

Voici un aperçu de la structure des dossiers principaux :

```
app/
├── annonces/          # Page de liste des annonces
├── api/               # Routes API (Proxy)
├── components/        # Composants réutilisables (Navbar, Footer, Cards...)
├── create-annonce/    # Page de création d'annonce
├── gestion-annonces/  # Gestion des annonces utilisateur
├── gestion-moderateurs/ # Interface modérateur
├── lib/               # Utilitaires (Auth, Token verification)
├── login/             # Page de connexion
├── logout/            # Page de déconnexion
└── page.tsx           # Page d'accueil
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request pour proposer des améliorations.

## 📄 Licence

Ce projet est sous licence privée.
