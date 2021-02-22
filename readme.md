# используется:

-   lowdb (создание БД)
-   uuid (генерация id)
-   morgan (логирование запросов)
-   joi (валидация)
-   ... express, cors, nodemon ...

# убрать запятые: ???НЕ РАБОТАЕТ???

-   пакет eslint-config-prettier
-   пакет eslint-plugin-json
-   в файле .eslintrc.js:
    -   extends: ['standard', 'plugin:json/recommended', 'prettier']
-   в файле package.json:
    -   "lint": "eslint \*\*/\*.{js,json}",
    -   "lint:fix": "eslint--fix \*\*/\*.{js,json}"
-   файл .prettierrc.json
