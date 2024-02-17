const { UsersController } = require("../controllers/usersController");
//const { idUsersController } = require("../controllers/IdUsersController");
//const { nameUsersController } = require("../controllers/nameUsersController");
//const { postUsersController } = require("../controllers/postUsersController");

const getHandlerUsers = async (req, res) => {
  try {
    let respuesta = await UsersController();

    res.status(200).json({
      message: "Data retrieved and saved successfully",
      respuesta,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


  module.exports = {
    getHandlerUsers,
    
};




