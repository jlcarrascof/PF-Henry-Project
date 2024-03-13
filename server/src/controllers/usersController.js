const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
const User = require('../models/UserModel');

const getUserById = async (id) => {
    const db = getDb();
    try {
        const user = await db.collection('users')
        .findOne({ _id: new ObjectId(id) });  
        return user;

    } catch (error) {
        throw error;
    }
};

const getUserByName = async (name) => {
    const db = getDb();
    try {
        const users = await db.collection('users')
        .findOne({ username: name })
        return users;

    } catch (error) {
        throw error;
    }
};


const createUser = async (userData) => {
    const db = getDb();
    try {
        const result = await db.collection('users')
        .insertOne(userData);
        return result;

    } catch (error) {
        throw error;
    }
};


const updateUser = async (id, updateData) => {
    const db = getDb();

    try {
        const result = await db.collection('users')
            .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        return result.matchedCount > 0 && result.modifiedCount > 0;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getUserById,
    getUserByName,
    createUser,
    updateUser,
};