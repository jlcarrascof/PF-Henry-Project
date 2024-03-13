const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getRoomById = async (id) => {
  const db = getDb()
  try{
    const room = await db.collection("rooms")
    .find({hotel_id: new ObjectId(id)})
    .toArray()

    return room
  } catch (error) {
    throw new Error(error)
  }
}

const disableUserById = async (id) => {
  const db = getDb();
  try {
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("Room not found");
    }
    const isDisabled = user.isDisabled;

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isDisabled: !isDisabled, 
        },
      }
    );

    console.log(`User ${id} isDisabled updated to: ${!isDisabled}`);

    return result;
  } catch (error) {
    console.error("Error updating User availability:", error.message);
    throw error;
  }
};

const disableRoomId = async (id) => {
    const db = getDb();
    try {
      const room = await db.collection("rooms").findOne({ _id: new ObjectId(id) });
  
      if (!room) {
        throw new Error("Room not found");
      }
      const isDisabled = room.availability;
  
      const result = await db.collection("rooms").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            availability: !isDisabled, 
          },
        }
      );
  
      console.log(`Room ${id} availability updated: ${!isDisabled}`);
  
      return result;
    } catch (error) {
      console.error("Error updating room availability:", error.message);
      throw error;
    }
  };


  const disableHotelId = async (id) => {
    const db = getDb();
    try {
      const hotel = await db.collection("hotels").findOne({ _id: new ObjectId(id) });
  
      if (!hotel) {
        throw new Error("Hotel not found");
      }
      const isDisabled = hotel.availability;
  
      const result = await db.collection("hotels").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            availability: !isDisabled, 
          },
        }
      );
  
      console.log(`Hotel ${id} availability updated: ${!isDisabled}`);
  
      return result;
    } catch (error) {
      console.error("Error updating room availability:", error.message);
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

  module.exports = {
    disableRoomId,
    disableHotelId,
    getAllUsers,
    getRoomById,
    disableUserById
  }