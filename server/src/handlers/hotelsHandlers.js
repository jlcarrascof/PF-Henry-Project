const {
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotelById,
} = require("../controllers/hotelsController");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

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
    const hotelData = req.body;

    const newHotel = await createHotel(hotelData);

    res.status(201).json(newHotel);
  } catch (error) {
    //console.error("Error creating hotel:", error);
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

    let filters = [];

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice !== "" &&
      maxPrice !== ""
    ) {
      filters.push({
        rooms: {
          $elemMatch: {
            $and: [
              { price: { $gte: parseFloat(minPrice) } },
              { price: { $lte: parseFloat(maxPrice) } }
          ]
        } },
      });
    }

    if (address) {
      filters.push({ address: { $regex: new RegExp(address, "i") } });
    }

    if (services) {
      const selectedServices = services.split(",");
      filters.push({
        services: {
          $all: selectedServices
        }
      });
    }

    if (desiredCheckInDate && desiredCheckOutDate) {
      filters.push({
        $or: [
          { "rooms.availability": true },
          {
            "rooms.reservations.startDate": {
              $gte: new Date(desiredCheckInDate),
            },
            "rooms.reservations.endDate": {
              $lte: new Date(desiredCheckOutDate),
            },
          },
        ],
      });
    }

    if (minScore !== undefined && minScore !== "") {
  filters.push({
    "reviews.score": { $gte: parseFloat(minScore) }
  });
}

    const query = filters.length > 0 ? { $and: filters } : {};

    const hotels = await db
      .collection("hotels")
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalHotels = await db.collection("hotels").countDocuments(query);
    const totalPages = Math.ceil(totalHotels / limit);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalResults: hotels.length,
      hotels: hotels,
    });
  } catch (error) {
    console.log("el error es: ", error);
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

const updateFav = async (req, res) => {
  const { id } = req.params;
  const db = getDb();

  try {
    const result = await db
      .collection("hotels")
      .updateOne(
        { "rooms.id": new ObjectId(id) },
        { $set: { "rooms.$.isFav": true } }
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


const getFav = async (req, res) => {
  const db = getDb();

  try {
    const result = await db.collection("hotels").aggregate([
      {
        $match: {
          "rooms.isFav": true,
        },
      },
      {
        $project: {
          images: 1,
          rooms: {
            $filter: {
              input: "$rooms",
              as: "room",
              cond: { $eq: ["$$room.isFav", true] },
            },
          },
        },
      },
    ]).toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const postReview = async (req, res) => {
  const db = getDb()
  const updateData = req.body;
  const {id} = req.params
  try{
    if (!ObjectId.isValid(req.params.id)){
      return res.status(404).send({error: "No es un ObjectId valido"})
    }
    const result = await db
      .collection("hotels")
      .updateOne({ _id: new ObjectId(id) }, {$push: {review: updateData}})

      res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getHotelID,
  postHotel,
  patchHotel,
  getHotelsFiltered,
  deleteHotelByID,
  updateFav,
  getFav, 
  postReview
};
