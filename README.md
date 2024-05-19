
# Project Title

express-samplets-starter


## Authors

- [@saadi925](https://www.github.com/saadi925)


# Project Title

express-samplets-starter


## Installation

Clone the repository:

git clone https://github.com/saadi925/express-samplets-starter.git

cd express-samplets-starter

Install dependencies:

npm install

or

yarn install

or 

pnpm install





## Scripts

Create a .env file in the root directory and add the necessary environment variables.



Start the development server with hot reloading  : npm run dev 

Compile TypeScript to JavaScript
:
npm run build


Start the production server
:npm start

Run ESLint to check for linting errors:
npm run lint


Format the code using Prettier:
npm run format
## Using CustomRouter and Registering Endpoints
The CustomRouter interface extends the default Express Router to include additional properties such as rootPath and endpoints. Endpoints can be defined and registered in a more structured way.



## Custom Router 
``` javascript.
import { Router } from 'express';
import { sampleController } from '@/controllers/testController';
import { CustomRouter } from '@/types/routes';
import appConfig from '@/main.config';

const router: CustomRouter = Router();

router.rootPath = '/api';
router.endpoints = [
  {
    path: '/',
    method: 'get',
    controller: sampleController,
  },
  {
    path: '/',
    method: 'post',
    controller: sampleController,
  },
];

// Register endpoints
appConfig.registerEndpoints(router);

export default router;

```
# Traditional Route Definition
You can still define routes in the traditional way if you prefer:
```
javascript.
import { Router } from 'express';
import { sampleController } from '@/controllers/testController';

const router = Router();

router.get('/api', sampleController);
router.post('/api', sampleController);

export default router;

```
## Project Structure 
```.
├── dist
├── LICENSE.md
├── logs
├── node_modules
├── package.json
├── package-lock.json
├── src
│   ├── controllers
│   │   └── testController.ts
│   ├── main.config.ts
│   ├── main.ts
│   ├── middlewares
│   ├── routes
│   │   └── index.ts
│   ├── services
│   ├── types
│   │   └── routes.ts
│   └── utils
├── tsconfig.build.json
└── tsconfig.json
```


## Support

For support, email userid925925@gmail.com


## Features

- ESLint
- Prettier
- Typescript
- Configuration File
- Logging
