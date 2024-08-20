# REST-GraphiQL-Client

## Content

- [Project Goal](#Goal)
- [Technologies](#Technologies)
- [Project structure](#Structure)
- [Getting Started](#Started)

## Project Goal 🌟

Development of an app that combines the core functionalities of Postman and GraphiQL.

## Technologies 🛠️

- TypeScript
- Next.js
- Tailwind CSS
- Eslint
- Prettier
- Jest
- Husky

## Project structure 🏗️

File and folder names in our project are composed according to specific conventions: folder names use camelCase, while components (such as ts files, etc.) are named in PascalCase.

Branch names in Git must strictly adhere to the conditions set in the technical specification. Labels have been created for each individual functionality, allowing for convenient task management: General, Bug, GraphiQL, History, RESTful Client. Branch example: general-07-addHeader

Git Project is used to track the team's progress.

## Getting Started

### Installation

To install, you need to clone the repository:

```
git clone https://github.com/KatsiarynaMizhuryna/graphiql-app.git
npm install
```

### Development

To start the development server, run:

```
npm start
```

### Testing 🧮

The project is covered by unit tests using Jest. To run them, execute:

```
npm test
```

### ESLint 📏

lint: Runs ESLint to check the code in files with the .ts extension.

```
npm run lint
```

lint:fix: Runs ESLint to check the code in files with the .ts extension and automatically fixes any detected issues.

```
npm run lint:fix
```

### Prettier ✨

format: Runs Prettier to format the code in project files.

```
npm run prettier-fix
```

### Husky 🐕

prepare: Configures Husky to use configurations from the .husky folder inside your project.

```
npm run prepare
```

### Git Hooks

**pre-commit hook**

This hook runs before a commit is created. In this project, it's used to check the code formatting before committing changes.

```
npx lint-staged
npm run prettier-fix
```

**pre-push hook**

This hook runs before data is sent to the server. In this project, it's used to run the test before sending changes.

```
npm test
```

Using Husky and Git Hooks, you can automate code checks before committing and before pushing to the server, which helps maintain code quality and avoid potential issues.

## Contacts 📄

- Katsiaryna Mizhuryna (e-mail: katsiaryna.mizhuryna@gmail.com)
- Anzhelika Turlak (e-mail: 293852647@mail.ru)
- Daria Shilnikova (e-mail: girl.is.anime20@gmail.com)
