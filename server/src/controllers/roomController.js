const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getById = async (id) => {
  const db = getDb();
  try {
    const room = await db
      .collection("rooms")
      .findOne({ _id: new ObjectId(id) });
    return room;
  } catch (error) {
    throw error;
  }
};

const createRoom = async (data) => {
  const db = getDb();

  try {
    const result = await db.collection("rooms").insertOne(data);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateRoom = async (id, updateData) => {
  const db = getDb();

  try {
    const result = await db
      .collection("rooms")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return result.matchedCount > 0 && result.modifiedCount > 0;
  } catch (error) {
    throw error;
  }
};

const deleteRoomById = async (id) => {
  const db = getDb();

  try {
    const result = await db
      .collection("rooms")
      .deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0 ? "room removed" : "room not found";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getById,
  createRoom,
  updateRoom,
  deleteRoomById,
};