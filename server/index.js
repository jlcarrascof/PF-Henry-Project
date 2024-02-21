const app = require('./src/app.js')
const {connectToDb, getDb} = require("./db");



connectToDb((error) => { 
    if(!error){
        app.listen(3001, () => {
            console.log(`%s listening at 3001`)
        })
        db = getDb()
    }
})


