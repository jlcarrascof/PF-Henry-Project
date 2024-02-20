const express = require("express")
const {connectToDb, getDb} = require("./db");
const { ObjectId } = require("mongodb");
const app = express();


app.use(express.json());

connectToDb((error) => {
    if(!error){
        app.listen(3001, () => {
            console.log(`Connected to Port 3001`)
        })
        db = getDb()
    }
})


// demo test --->>> No está separado y modularizado en controladores como deberia por ser solo pruebas, perdonarán


app.get("/hotels", (req, res) => {
    // Paginado
    const page = req.query.p || 0;
    const songPerPage = 3

    let hotels = []

    db.collection("test")
        .find()
        .sort({Year: 1})
        .skip(page * songPerPage)
        .limit(songPerPage)
        .forEach(hotel => hotels.push(hotel))
        .then(()=>{
            res.status(200).send(hotels)
        })
        .catch(() => {
            res.status(500).send({error: "No pudimos traer los hoteles"})
        })
})

// Routing by id

app.get("/hotel/:id", (req, res) => {

    if(ObjectId.isValid(req.params.id)){

        db.collection("test")
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send({err})
        })
    } else {
        res.status(500).send({error: "No pudiste hacer fetch pa, portate serio"})
    }
})

// Enrutamiento post

app.post("/hotels", (req, res) => {
    const cd = req.body

db.collection("test")
    .insertOne(cd)
    .then(result => {
        res.status(201).send(result)
    })
    .catch(error => {
        res.status(500).json({error: "No se pudo subir el hotel"})
    })
})

// prueba de Post a una coleccion distinta de la misma base de datos

app.post("/review", (req, res) => {
    const cd = req.body

db.collection("reviews-test")
    .insertOne(cd)
    .then(result => {
        res.status(201).send(result)
    })
    .catch(error => {
        res.status(500).json({error: "No se pudo subir el review"})
    })
})


// Ahora vamos a borrar esas propiedades

app.delete("/hotel/:id", (req, res) => {
    if(ObjectId.isValid(req.params.id)){

        db.collection("test")
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(201).send(result)
        })
        .catch(err => {
            res.status(500).send({error: "Not possible my friend"})
        })
    } else {
        res.status(500).send({error: "No se pudo borrar de mi memoria"})
    }
})

// Vamo a editar info sin corregir todo

app.patch("/hotel/:id", (req, res) => {
    const updates = req.body

    if(ObjectId.isValid(req.params.id)){

        db.collection("test")
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(201).send(result)
        })
        .catch(err => {
            res.status(500).send({error: "No actualizacion para ti"})
        })
    } else {
        res.status(500).send({error: "Así estaba bien, no moleste mano"})
    }
})


// Añadimos reviews conforme recibimos 


app.patch("/hotel/:id/testreview", (req, res) => {
    const newReview = req.body

    if(ObjectId.isValid(req.params.id)){

        db.collection("test")
        .updateOne({_id: new ObjectId(req.params.id)}, {$push: {reviews: newReview}})
        .then(result => {
            res.status(201).send(result)
        })
        .catch(err => {
            res.status(500).send({error: "No actualizacion para ti"})
        })
    } else {
        res.status(500).send({error: "Así estaba bien, no moleste mano"})
    }
})