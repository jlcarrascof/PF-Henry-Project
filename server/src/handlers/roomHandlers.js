const {
    getById,
    createHotel,
    updateHotel,
    deleteRoomById,
  } = require("../controllers/hotelsController");
  const { ObjectId } = require("mongodb");
  const { getDb } = require("../db");
  
  const getRoomById = async (req, res) => {
    try {
      console.log("Id antes del handler", req.params.id);
      if (ObjectId.isValid(req.params.id)) {
        const { id } = req.params;
        const hotel = await getById(id);
  
        res.status(200).json(hotel);
      } else {
        return res
          .status(400)
          .json({ error: "ID not provided in route parameters" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const postRoom = async (req, res) => {
    try {
      const hotelData = req.body;
      const newHotel = await createHotel(hotelData);
  
      res.status(201).json(newHotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const patchRoom = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "ID not valid" });
      }
  
      const { id } = req.params;
      const updateData = req.body;
  
      const success = await updateHotel(id, updateData);
  
      if (success) {
        return res.status(200).json({ message: "Hotel updated successfully" });
      } else {
        return res
          .status(404)
          .json({ error: "Hotel not found or no changes applied" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  const getRoomFiltered = async (req, res) => {
    try {
      const {
        minPrice,maxPrice,address,desiredCheckInDate,
        desiredCheckOutDate,minScore,services,
      } = req.query;
      const db = getDb();
      const page = parseInt(req.query.p) || 1;
      const limit = parseInt(req.query.limit) || 2;
  
      let filters = [];
  
      const defaultMinPrice = 0;
      const defaultMaxPrice = 1000;

    const parsedMinPrice = minPrice !== undefined && minPrice !== "" ? parseInt(minPrice) : defaultMinPrice;
    const parsedMaxPrice = maxPrice !== undefined && maxPrice !== "" ? parseInt(maxPrice) : defaultMaxPrice;

    filters.push({
        "price": { $gte: parsedMinPrice, $lte: parsedMaxPrice },
    });
  
      if (address) {
        filters.push({ address: { $regex: new RegExp(address, "i") } });
      }
  
      if (services) {
        filters.push({ services: {
          $elemMatch: {
            $in: services.split(",")
          }
        } });
      }
  
      if (desiredCheckInDate && desiredCheckOutDate) {
        filters.push({
          $or: [
            { "availability": true },
            {
              "reservations.startDate": {
                $gte: new Date(desiredCheckInDate),
              },
              "reservations.endDate": {
                $lte: new Date(desiredCheckOutDate),
              },
            },
          ],
        });
      }
  
      /* if (minScore !== undefined && minScore !== "") {
        filters.push({ "reviews.score": { $gte: parseInt(minScore) } });
      } */

      if (minScore !== undefined && minScore !== "") {
        filters.push({
          reviews: {
            $elemMatch: {
              score: { $gte: parseFloat(minScore) }
            }
          }
       });
     }
  
      const query = filters.length > 0 ? { $and: filters } : {};
  
      const rooms = await db
        .collection("rooms")
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
  
      const totalRooms = await db.collection("rooms").countDocuments(query);
      const totalPages = Math.ceil(totalRooms / limit);
  
      res.status(200).json({
        currentPage: page,
        totalPages: totalPages,
        totalResults: rooms.length,
        rooms: rooms,
      });
    } catch (error) {
      console.log("el error es: ", error);
      res.status(400).json({ error: error.message });
    }
  };
  
const deleteRoomByID = async (req, res) => {
    try {
    const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ error: "ID not provided in route parameters" });
      }
      const result = await deleteRoomById(id);
      res.status(201).send(result)
    } catch (err) {
      res.status(500).send(err);
    }
};
  
const updateFav = async (req, res) => {
    const { id } = req.params;
    const db = getDb();
    try {
      const result = await db
        .collection("rooms")
        .updateOne(
          { "_id": new ObjectId(id) },
          { $set: { "isFav": true } }
        );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Room marked as favorite" });
      } else {
        res.status(404).json({ message: "Room not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getRoomById,
    postRoom,
    patchRoom,
    getRoomFiltered,
    deleteRoomByID,
    updateFav
  };
  