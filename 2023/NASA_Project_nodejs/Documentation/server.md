# server

### `content's`

## setting up the project

need to initialize the folder

```nodejs
npm init -y //giving yes to all the prompts
```

## installing the required dependencies

```nodejs
npm intall express
npm install --save-dev nodemon //need to install this as dev dependencie 
```

## configuring the project

in script's add the following's

```nodejs
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "watch": "nodemon server.js"
},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

npm run server && npm run client `&& will wait till npm run server to complete and then run npm run client`

we replace && with &  `& will run first command in background and will also run the other command`

### npm packages used

1. `morgan` to get additional functionality
    1. allows us to log in different formats
    2. we can use the most common combined format

> we are following a layered architecture pattern 
>> `User Interface`, `Buisness Logic`, `Data access`
>>> sometime's these are standalone or combined with mvc
>>> these layer's are know as `SEPARATION OF CONCERN ( SoC )` each sessoin address a separate concern

## testing our application