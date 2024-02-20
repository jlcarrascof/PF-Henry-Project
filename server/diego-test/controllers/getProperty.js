const { Property, Review } = require("../models/PropertyModel");
const mongoose = require("mongoose")

const getProperties = async (req, res) => {
    try {
      const propertiesWithReviews = await Property.find().populate('Review');
  
      // Mapear a un formato deseado
      const fromDB = propertiesWithReviews.map((property) => ({
        name: property.name,
        details: property.details,
        images: property.images,
        contact: property.contact,

        reviews: property.reviews.map((review) => ({
          name: review.name,
          score: review.score,
          date: review.date
        })),
      }));
  
      res.status(200).send(fromDB);
    } catch (error) {
      res.status(500).send({error: "No se pudo pa"});
    }
  };

module.exports = getProperties
