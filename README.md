# Auto Complete Component

This project was built as a test from Deel.

It's using [JSON Placeholder](https://github.com/https://jsonplaceholder.typicode.com/) as a free fake API for prototyping. It's simple fetching a list of todos from [https://jsonplaceholder.typicode.com/todos](https://github.com/https://jsonplaceholder.typicode.com/todos)

## React + TypeScript + Vite

This project was build with a template that provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## How to run the project

```bash
yarn install
```

To install dependencies and then run:

```bash
yarn dev
```

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
