const {
  getHotelById,
  getHotelByName,
  createHotel,
  updateHotel,
  deleteHotelById,
} = require("../controllers/hotelsController");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getHotelID = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const { id } = req.params;

      const hotel = await getHotelById(id);

      res.status(200).json(hotel);
    } else {
      return res
        .status(400)
        .json({ error: "ID not provided in route parameters" });
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error.message });
  }
};


//Para Hotel por nombre y para todos los hoteles, también los filtros
const getHotels = async (req, res) => {
  try {    
    const { name } = req.query;

    let hotels;

    if (name) {
      //Mostrar Hotel por Nombre
      hotels = await getHotelByName(name);
    } else {
      //Mostrar todos los hoteles
      hotels = await getAllHotels();
    }

    
    res.status(200).json(hotels);
  } catch (error) {
    //console.error("Error fetching hotels:", error);
    res.status(400).json({ error: error.message });
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

    const {id} = req.params;
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
    const { minPrice, maxPrice, address, desiredCheckInDate, desiredCheckOutDate, minScore, services } = req.query;
    const db = getDb();
    const page = parseInt(req.query.p) || 1; 
    const limit = parseInt(req.query.limit) || 2; 

    let filters = [];

    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.push({ 'rooms.price': { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } });
    }

    if (address) {
      filters.push({ address: { $regex: new RegExp(address, 'i') } });
    }

    if (services) {
      filters.push({ services: { $in: services.split(',') } });
    }

    if (desiredCheckInDate && desiredCheckOutDate) {
      filters.push({ $or: [
        { 'rooms.availability': true },
        {
          'rooms.reservations.startDate': { $gte: new Date(desiredCheckInDate) },
          'rooms.reservations.endDate': { $lte: new Date(desiredCheckOutDate) }
        }
      ]});
    }

    if (minScore !== undefined) {
      filters.push({ 'reviews.score': { $gte: parseInt(minScore) } });
    }

    const query = filters.length > 0 ? { $and: filters } : {};

    const hotels = await db.collection("hotels")
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
      hotels: hotels
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//const deleteHotelByID = async (req, res) => {
 // try {
   // const { id } = req.params;

    //if (!id) {
    //  return res
    //    .status(400)
    //    .json({ error: "ID not provided in route parameters" });
   // }

   // const result = await deleteHotelById(id);

   // if (result === "Hotel removed") {
   //   return res.status(200).json({ message: "Hotel deleted successfully" });
   // } else {
  //    return res.status(404).json({ error: "Hotel not found" });
  //  }
  //} catch (error) {
    //console.error("Error deleting hotel:", error);
 //   return res.status(500).json({ error: error.message });
 // }
//};

module.exports = {
  getHotelID,
  getHotels,
  postHotel,
  patchHotel,
<<<<<<< HEAD
  getHotelsFiltered
//delete

=======
  getHotelsFiltered,
>>>>>>> 6e178dcf32decc3156f4c468adde90fd71643523
};










