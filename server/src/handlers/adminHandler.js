const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
const { disableRoomId, disableHotelId } = require("../controllers/adminController");


const disableRoom = async (req, res) => {
    const {id} = req.params;
    try {
      if(!ObjectId.isValid(id)){
        res.status(404).send("Room id not valid")
        return
      }
      const result = await disableRoomId(id);

      res.status(201).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  const getDisabledRooms = async (req, res) => {
    const db = getDb(); 
    try {
      const totalResults = await db.collection("rooms").countDocuments();
  
      const rooms = await db
        .collection("rooms")
        .find()
        .toArray();
  
      res.status(200).json({
        totalResults: totalResults,
        rooms: rooms,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };


  const disableHotel = async (req, res) => {
    const {id} = req.params;
    try {
      if(!ObjectId.isValid(id)){
        res.status(404).send("Room id not valid")
        return
      }
      const result = await disableHotelId(id);

      res.status(201).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  const getDisabledHotels = async (req, res) => {
    const db = getDb(); 
    try {
      const totalResults = await db.collection("hotels").countDocuments();
  
      const hotels = await db
        .collection("hotels")
        .find()
        .toArray();
  
      res.status(200).json({
        totalResults: totalResults,
        hotels: hotels,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };


  module.exports = {
    disableRoom,
    getDisabledRooms,
    disableHotel,
    getDisabledHotels
  }