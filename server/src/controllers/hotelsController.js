const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const getHotelById = async (id) => {
    const db = getDB();
    try {
        const hotel = await db.collection('hotels')
        .findOne(
            { _id: new ObjectId(id) }
        );

        return hotel;

    } catch (error) {
        throw error;
    }
};

const getHotelByName = async (name) => {
    const db = getDB();
    try {
        const hotels = await db.collection('hotels')
        .find(
            { name: name }
        )
        .toArray();

        return hotels;

    } catch (error) {
        throw error;
    }
};

const getAllHotels = async () => {
    const db = getDB();
    try {
        const hotels = await db.collection('hotels')
        .find()
        .toArray();

        return hotels;

    } catch (error) {
        throw error;
    }
};

const createHotel = async (hotelData) => {
    const db = getDB();

    try {
        const result = await db.collection('hotels')
        .insertOne(hotelData);

        return result.ops[0];

    } catch (error) {
        throw error;
    }
};

const updateHotel = async (id, updateData) => {
    const db = getDB();

    try {

        const result = await db.collection('hotels')
        .updateOne(
            { _id: new ObjectId(id) }, { $set: updateData }
        );

        return result.modifiedCount > 0 ? true : false;

    } catch (error) {
        throw error;
    }
};

const deleteHotelById = async (id) => {
    const db = getDB();

    try {
        const result = await db.collection('hotels')
        .deleteOne(
            { _id: new ObjectId(id) }
        );
        
        return result.deletedCount > 0 ? 'Hotel removed' : 'Hotel not found';
    
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getHotelById,
    getHotelByName,
    getAllHotels,
    createHotel,
    updateHotel,
    deleteHotelById
};
