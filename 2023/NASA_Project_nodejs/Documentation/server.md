# server

some info

## setting up the project

need to initialize the folder

```nodejs
npm init -y
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