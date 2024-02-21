const app = require('./src/app.js')
const {connectToDb, getDb} = require("../server/src/db.js");



connectToDb((error) => { 
    if(!error){
        app.listen(3001, () => {
            console.log(`%s listening at 3001`)
        })
        db = getDb()
    }
})


