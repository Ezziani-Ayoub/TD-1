# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Q1: On utilise <Navigate /> ici parce que la redirection se fait pendant le rendu du composant, alors que navigate() sert pour rediriger dans des fonctions ou événements, pas directement dans le JSX.

Q2: navigate(from) ajoute la page au historique (on peut revenir en arrière), alors que navigate(from, { replace: true }) remplace la page actuelle pour empêcher de revenir au login.

Q3: On fait setProjects pour mettre à jour l’état local immédiatement avec le nouveau projet, évitant ainsi un re-fetch coûteux et rendant l’UI plus réactive

Q5: <NavLink> ajoute automatiquement une classe active quand la route correspond, contrairement à <Link>, ce qui permet de styliser le lien actif dans la Sidebar

Q6:La différence est que POST crée un nouveau projet, tandis que PUT met à jour un projet existant en utilisant ses valeurs initiales et son id

Q7 : Oui, lorsque json-server est arrêté la requête échoue et le message d’erreur s’affiche grâce au catch qui met à jour setError

Q8 : Avec Axios une réponse HTTP comme 404 ou 500 déclenche automatiquement une erreur, donc elle est capturée dans le catch

-----------------------------------------------------------------------------------------------------------------
# TP 4
Q1: Aucune ligne de CSS avec MUI, contrairement à avant où il fallait en écrire plusieurs
Q2: Bootstrap est plus simple et plus lisible. MUI est un peu plus long
Q3: Je préfère MUI (sx) parce que c’est plus pratique et rapide
Q4: Je choisis MUI parce que c’est plus moderne et personnalisable
Q5: Parce que ce n’est pas sécurisé, il faut un backend
Q6: Pas sécurisé, pas scalable, pas adapté pour production
Q7: Parce que Firebase fournit une API sécurisée directement
Q8: Créer un backend, une vraie base de données, ajouter sécurité, puis déployer
Q9: Risque de dépendance et application plus lourde
Q10: Firebase, car il gère le temps réel facilement

## Tableau comparatif


| Critère                    | Material UI      | React-Bootstrap |
|---------------------------|------------------|------------------|
| Installation              | Plus longue      | Simple           |
| Nombre de composants      | Beaucoup         | Moins            |
| Lignes de CSS écrites     | 0                | Quelques         |
| Système de style          | sx (JS)          | className (CSS)  |
| Personnalisation couleurs | Très facile      | Moyenne          |
| Responsive                | Bon              | Bon              |
| Lisibilité du code        | Moyenne          | Bonne            |
| Documentation             | Très riche       | Bonne            |
| Votre préférence          | MUI              |                  |

React 
   ↓ HTTP
Axios
   ↓
json-server
   ↓
db.json