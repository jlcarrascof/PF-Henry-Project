const {
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotelById,
} = require("../controllers/hotelsController");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
const { Hotel } = require("../models/RoomsModel");

const getHotelID = async (req, res) => {
  try {
    console.log("Id antes del handler", req.params.id);
    if (ObjectId.isValid(req.params.id)) {
      const { id } = req.params;
      console.log("id recibido: ", id);
      const hotel = await getHotelById(id);

      res.status(200).json(hotel);
    } else {
      console.log(id);
      return res
        .status(400)
        .json({ error: "ID not provided in route parameters" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postHotel = async (req, res) => {
  try {
    const { name, owner, details, address, services, contact } = req.body;
    const newHotel = new Hotel({
       name, 
       owner, 
       details, 
       address, 
       services, 
       contact 
      });
    const savedHotel = await createHotel(newHotel);

    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const patchHotel = async (req, res) => {
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
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllHotels = async (req, res) => {
  const db = getDb();
  const page = parseInt(req.query.p) || 1;
  const limit = parseInt(req.query.limit) || 2;

  try {
    const totalHotels = await db.collection("hotels").countDocuments();
    const totalPages = Math.ceil(totalHotels / limit);

    const hotels = await db
      .collection("hotels")
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalResults: totalHotels,
      hotels: hotels,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


const getHotelsFiltered = async (req, res) => {
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
    const limit = parseInt(req.query.limit) || 2;

    const filters = [];

    const defaultMinPrice = 0;
    const defaultMaxPrice = 1000;

    const parsedMinPrice = minPrice !== undefined && minPrice !== "" ? parseInt(minPrice) : defaultMinPrice;
    const parsedMaxPrice = maxPrice !== undefined && maxPrice !== "" ? parseInt(maxPrice) : defaultMaxPrice;

    if (parsedMinPrice || parsedMaxPrice) {
      filters.push({
        "rooms.price": { $gte: parsedMinPrice, $lte: parsedMaxPrice },
      });
    }

    if (address) {
      filters.push({ address: { $regex: new RegExp(address, "i") } });
    }

    if (services) {
      filters.push({
        services: { $elemMatch: { $in: services.split(",") } },
      });
    }

    if (desiredCheckInDate && desiredCheckOutDate) {
      filters.push({
        $or: [
          { "rooms.availability": true },
          {
            "rooms.reservations.startDate": { $gte: new Date(desiredCheckInDate) },
            "rooms.reservations.endDate": { $lte: new Date(desiredCheckOutDate) },
          },
        ],
      });
    }

    if (minScore !== undefined && minScore !== "") {
      filters.push({
        reviews: {
          $elemMatch: { score: { $gte: parseFloat(minScore) } },
        },
      });
    }

    const aggregationPipeline = [
      { $match: filters.length > 0 ? { $and: filters } : {} },
      {
        $project: {
          name: 1,
          address: 1,
          services: 1,
          images: 1,
          rooms: {
            $filter: {
              input: "$rooms",
              as: "room",
              cond: {
                $and: [
                  { $gte: ["$$room.price", parsedMinPrice || defaultMinPrice] },
                  { $lte: ["$$room.price", parsedMaxPrice || defaultMaxPrice] },
                ],
              },
            },
          },
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const hotels = await db.collection("hotels").aggregate(aggregationPipeline).toArray();

    const totalHotels = await db.collection("hotels").countDocuments(filters.length > 0 ? { $and: filters } : {});
    const totalPages = Math.ceil(totalHotels / limit);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalResults: hotels.length,
      hotels: hotels,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const deleteHotelByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: "ID not provided in route parameters" });
    }

    const result = await deleteHotelById(id);
    res.status(201).send(result)
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  getAllHotels,
  getHotelID,
  postHotel,
  patchHotel,
  getHotelsFiltered,
  deleteHotelByID
};