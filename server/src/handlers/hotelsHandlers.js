const {
  getHotelById,
  getHotelByName,
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotelById,
} = require("../controllers/hotelsController");
const { ObjectId } = require("mongodb");

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

//Para Hotel por nombre y para todos los hoteles
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
    const result = await updateHotel(id, updateData);

    return res.status(200).json(result);
  } catch (error) {
    //console.error("Error updating hotel:", error);
    return res.status(500).json({ error: error.message });
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

    if (result === "Hotel removed") {
      return res.status(200).json({ message: "Hotel deleted successfully" });
    } else {
      return res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    //console.error("Error deleting hotel:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getHotelID,
  getHotels,
  postHotel,
  patchHotel,
  deleteHotelByID,
};
