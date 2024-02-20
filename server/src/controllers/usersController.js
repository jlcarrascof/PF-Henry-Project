const axios = require("axios");
const { User } = require("../db");
require("dotenv").config();

const { API } = process.env;

const UsersController = async () => {
 /* algo como lo siguen igual y se me escapa algún paréntesis... igual hay que borrarlo
 
  try {
    //alguna cosa
      try {
        // otras cosas
      } catch (innerError) {
        console.error("Error processing ***:", innerError.message);
      }
    };

    

    return undefined;
  } catch (error) {
    console.error("Error fetching data from the ****:", error.message);
    return [];
  }
};

module.exports = { UsersController };

