


const rangePrice = async (db, minPrice, maxPrice) => { //la base de datos y el rango por el cual filtrar
    return await db.collection("hotels").find({
        'rooms.price': { $gte: minPrice, $lte: maxPrice } //Donde buscar
    }).toArray(); //Va a devolver un array de objetos con los hoteles filtrados
};
    



//Por ubicación (podemos en el modelo agregar "location" para filtrar por location en vez de filtrar por address)
const filterAddress = async (db, address) => {
    return await db.collection("hotels").find({ 
        address: { $regex: address, $options: 'i' } //$options: 'i' sin importar mayusculas o minusculas
    }).toArray();//Va a devolver un array de objetos con los hoteles filtrados
};



//busca hoteles cuyas habitaciones tengan disponibilidad para un rango de fechas especificas 
const filterDate = async (db, desiredCheckInDate, desiredCheckOutDate) => {
    return await db.collection("hotels").find({
        'rooms.availability': {
            $elemMatch: {
                startDate: { $lte: desiredCheckOutDate },
                endDate: { $gte: desiredCheckInDate }
            }
        }
    }).toArray();//Devuelve los hoteles que tienen disponibilidad en esas fechas especificas
};



const filterScore = async (db, minScore) => {
    return await db.collection("hotels").find({
        'reviews.score': { $gte: minScore }
    }).toArray();
};      



const sortNameHotel = async (db) => {
    return await db.collection("hotels")
        .find({})
        .sort({ name: 1 })
        .toArray();
};



module.exports = {
rangePrice,
filterAddress,
filterDate,
filterScore,
sortNameHotel
}








