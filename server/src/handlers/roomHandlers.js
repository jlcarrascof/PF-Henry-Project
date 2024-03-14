const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const {
  getRoomId,
  createRoom,
  updateRoom,
  deleteRoomId,
} = require("../controllers/roomController");

const { Room, reviewSchema } = require("../models/RoomsModel");

const getRoomById = async (req, res) => {
  try {
    console.log("Id antes del handler", req.params.id);
    if (ObjectId.isValid(req.params.id)) {
      const { id } = req.params;
      const hotel = await getRoomId(id);

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
    const {
      hotel_id,
      description,
      typeOfRoom,
      services,
      price,
      availability,
      images,
      contact,
      num_rooms,
      reviews,
      totalScore,
      location
    } = req.body;
    const newRoom = new Room({
      hotel_id,
      description,
      typeOfRoom,
      services,
      price,
      images,
      contact,
      num_rooms,
      availability,
      totalScore,
      reviews,
      location
    });
    const savedRoom = await createRoom(newRoom);

    res.status(201).json(savedRoom);
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

    const success = await updateRoom(id, updateData);

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
      minPrice,
      maxPrice,
      address,
      desiredCheckInDate,
      desiredCheckOutDate,
      minScore,
      services,
    } = req.query;
    const db = getDb();
    const page = parseInt(req.query.p) || 1;
    const limit = parseInt(req.query.limit) || 4;

    let filters = [];

    const defaultMinPrice = 0;
    const defaultMaxPrice = 1000;
    const parsedMinPrice =
      minPrice !== undefined && minPrice !== ""
        ? parseInt(minPrice)
        : defaultMinPrice;
    const parsedMaxPrice =
      maxPrice !== undefined && maxPrice !== ""
        ? parseInt(maxPrice)
        : defaultMaxPrice;

    filters.push({
      price: { $gte: parsedMinPrice, $lte: parsedMaxPrice },
    });

    if (address) {
      const roomWithHotel = await db
        .collection("rooms")
        .aggregate([
          {
            $lookup: {
              from: "hotels",
              localField: "hotel_id",
              foreignField: "_id",
              as: "hotel",
            },
          },
          {
            $match: {
              "hotel.address": { $regex: new RegExp(address, "i") },
            },
          },
        ])
        .toArray();

      filters.push({
        _id: { $in: roomWithHotel.map((room) => room._id) },
      });
    }

    if (services) {
      filters.push({
        services: {
          $elemMatch: {
            $in: services.split(","),
          },
        },
      });
    }

    if (desiredCheckInDate && desiredCheckOutDate) {
      filters.push({
        $or: [
          { availability: true },
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

    if (minScore !== undefined && minScore !== "") {
      filters.push({
        reviews: {
          $elemMatch: {
            score: { $gte: parseFloat(minScore) },
          },

        },

        });
      }
  
      const query = filters.length > 0 ? { $and: filters, availability: true } : {};
  
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
    const result = await deleteRoomId(id);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateFav = async (req, res) => {
  const { id } = req.params;
  const { roomId } = req.body;
  const db = getDb();
  try {
    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { Favorites: roomId } }
      );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Room marked as favorite" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFav = async (req, res) => {
  const db = getDb();
  try {
    const result = await db
      .collection("rooms")
      .aggregate([
        { $match: { isFav: true } },
        {
          $lookup: {
            from: "hotels",
            localField: "hotel_id",
            foreignField: "_id", 
            as: "hotelInfo", 
          },
        },
        {
          $project: {
            name: 1,
            images: 1,
            typeOfRoom: 1,
            price: 1,
            "hotelInfo.address": 1,
            totalScore: 1,
          },
        },
      ])
      .toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const postReview = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: "No es un ObjectId valido" });
    }

      const newReview = req.body; 

      console.log("Reseña que se crea: ", newReview)
      const result = await db
        .collection("rooms")
        .updateOne({ _id: new ObjectId(id) }, {
          $push: {reviews: newReview},
          $set: {
            totalScore: {
              $avg: "reviews.score"
            }
          }
        })
  
        console.log("nueva reseña: ", newReview)
        res.status(200).send(result)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }

const getAllRooms = async (req, res) => {
  const db = getDb();
  const page = parseInt(req.query.p) || 1;
  const limit = parseInt(req.query.limit) || 4;

  try {
    const totalHotels = await db.collection("rooms").countDocuments();
    const totalPages = Math.ceil(totalHotels / limit);

    const rooms = await db
      .collection("rooms")
      .find({ availability: true })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalResults: totalHotels,
      rooms: rooms,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getRoomById,
  postRoom,
  patchRoom,
  getRoomFiltered,
  deleteRoomByID,
  updateFav,
  getFav,
  postReview,
  getAllRooms,
};
