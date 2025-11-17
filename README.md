
# React + TypeScript + Vite + Apollo — Login GraphQL

Projet minimal **dernier cri** (Vite + React 18 + TS) qui effectue un **login via une mutation GraphQL** (Apollo Client).

## Démarrage

1. **Cloner / dézipper** ce projet.
2. Dupliquer `.env.example` en `.env` et définir l'URL de votre endpoint GraphQL :

   ```bash
   cp .env .env
   # puis éditez .env
   ```

3. Installer les dépendances et lancer :

   ```bash
   npm i
   npm run dev
   ```

   ou avec pnpm :

   ```bash
   pnpm i
   pnpm dev
   ```

4. Ouvrir l'app (affiché par Vite, typiquement http://localhost:5173).

## Configuration

- **Endpoint GraphQL** via variable d'env Vite `VITE_GRAPHQL_URL`.
- **Token** stocké dans `localStorage` sous la clé `token` après un login réussi.
- Le header `Authorization: Bearer <token>` est automatiquement ajouté pour les requêtes suivantes.

## Schéma attendu (à adapter)

La mutation fournie est générique et peut nécessiter une adaptation à votre API :

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user { id email }
  }
}
```

Si votre API utilise d'autres noms de champs (ex: `username` au lieu de `email`, `loginUser`, `authenticate`, etc.), modifiez `src/graphql/mutations.ts` et `src/components/LoginForm.tsx` en conséquence.

## Scripts

- `npm run dev` : serveur de dev Vite
- `npm run build` : build de prod
- `npm run preview` : prévisualisation du build

## Stack

- React 18, TypeScript 5
- Vite 5
- Apollo Client 3, GraphQL 16

---

*Made with ❤️*
