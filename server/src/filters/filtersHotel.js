

//Lista de hoteles que tienen al menos una habitación con un precio entre $precioMnimo y $PrecioMaximo
const rangePrice = async (db, minPrice, maxPrice) => {
    return await db.collection("hotels").find({
        'rooms.price': { $gte: minPrice, $lte: maxPrice } 
    }).toArray(); 
};
    



//Por ubicación (podemos en el modelo agregar "location" para filtrar por location en vez de filtrar por address)
const filterAddress = async (db, address) => {
    return await db.collection("hotels").find({ 
        address: { $regex: address, $options: 'i' } 
    }).toArray();
};


const filterService = async (db, service) => {
    return await db.collection("hotels")
            .find({ services: { $in: [service] } })
            .toArray();
}


//busca hoteles cuyas habitaciones tengan disponibilidad para un rango de fechas especificas 
const filterDate = async (db, desiredCheckInDate, desiredCheckOutDate) => {
    return await db.collection("hotels").find({
        'rooms.availability': {
            $elemMatch: {
                startDate: { $lte: desiredCheckOutDate },
                endDate: { $gte: desiredCheckInDate }
            }
        }
    }).toArray();
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
sortNameHotel,
filterService
}








