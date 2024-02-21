const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

const getUserById = async (id) => {
    const db = getDb();
    try {
        const user = await db.collection('users')
// con el uso de new se rompe el ObjectId aqui, se realizaran pruebas sin el new
        .findOne({ _id: ObjectId(id) });  
        return user;

    } catch (error) {
        throw error;
    }
};

const getUserByName = async (name) => {
    const db = getDb();
    try {
        const users = await db.collection('users')
        .find({ name: name }).toArray();
        return users;

    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    const db = getDb();
    try {
        const users = await db.collection('users')
        .find()
        .toArray();
       
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
        return result.ops[0];

    } catch (error) {
        throw error;
    }
};


const updateUser = async (id, updateData) => {
    const db = getDb();
    try {
        const result = await db.collection('users')
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        return result.modifiedCount > 0 ? true : false;

    } catch (error) {
        throw error;
    }
};


const deleteUserById = async (id) => {
    const db = getDb();
    try {

        const result = await db.collection('users')
        .deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0 ? 'User removed' : 'User not found';
    
      } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    getUserByName,
    getAllUsers,
    createUser,
    updateUser,
    deleteUserById
};