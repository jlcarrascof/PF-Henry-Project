const axios = require("axios"); // para hacer solicitudes HTTP
const { Hoteles } = require("../db");
require("dotenv").config();

// const { API } = process.env;

const HotelesController = async () => {
 /* try {
    
      }
    };

    
    return undefined;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Internal Server Error");
  }
};

module.exports = { hotelesController };
