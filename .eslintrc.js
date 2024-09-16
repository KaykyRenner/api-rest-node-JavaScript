const globals = require('globals');
const { defineConfig } = require('@eslint/js');

module.exports = defineConfig({
    env: {
    node: true, // Indica que o ambiente é Node.js
    es2021: true // Habilita ECMAScript 2021
    },
    extends: [
    'eslint:recommended' // Configurações recomendadas do ESLint
    ] ,
    parserOptions: {
    ecmaVersion: 12 // Define a versão do ECMAScript
    },
    globals: {
    process: 'readonly' // Torna o objeto `process` somente leitura
    },
    rules: {
    // Suas regras personalizadas aqui
    }
});
