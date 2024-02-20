const { hotelesController } = require("../controllers/hotelesController");


const getHandlerHoteles = async (req, res) => {
  try {
    let respuesta = await hotelesController();
    res.status(200).json({
      respuesta,
      message: "Data retrieved and saved successfully",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { getHandlerHoteles };