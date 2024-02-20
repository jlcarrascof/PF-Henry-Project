import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username: {
        firstname: {
          type: String,
          required: true
        },
        lastname: {
          type: String,
          required: true
        }
      },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: { //array de strings que contiene los roles del usuario
        type: [String],
        required: true
      },
    address: {
        type: String,
        required: true
    },
    reviews: [{
        type: String
    }],
    cartReservation: {
        hotels: [{
          type: Schema.Types.ObjectId,
          ref: 'hotel' //relacionar usuarios con hoteles
        }]
    },
    
    
});

export default mongoose.model("User", UserSchema);

