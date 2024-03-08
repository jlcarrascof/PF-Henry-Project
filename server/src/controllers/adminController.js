const { ObjectId } = require("mongodb");
const { getDb } = require("../db");


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

  module.exports = {
    disableRoomId,
    disableHotelId
  }