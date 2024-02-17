```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "Server Proyecto Individual",
  "main": "index.js",
  "scripts": {
    "server": "nodemon index.js",
    "api": "_---_",
    "start": "concurrently \"npm run server\" \"npm run api\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {

    "pg": "^8.10.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.31.1"
  }
}
```
