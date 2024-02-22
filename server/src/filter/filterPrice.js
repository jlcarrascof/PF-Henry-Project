const { getDb } = require("../db");

const filterHotelsByPrice = async (minPrice, maxPrice) => {
    const db = getDb();
    try {
        const hotels = await db.collection("hotels")
            .find({ "rooms.price": { $gte: minPrice, $lte: maxPrice } })
            .toArray();
        return hotels;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    filterHotelsByPrice
};
