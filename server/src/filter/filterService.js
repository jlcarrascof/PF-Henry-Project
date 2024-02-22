const { getDb } = require("../db");

const filterHotelsByService = async (service) => {
    const db = getDb();
    try {
        const hotels = await db.collection("hotels")
            .find({ services: { $in: [service] } })
            .toArray();
        return hotels;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    filterHotelsByService
};
