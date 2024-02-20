import mongoose from "mongoose";
const { Schema } = mongoose;

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
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
    role: {
        type: String,
        default: 'admin'
    },
    permissions: { //permisos específicos que tiene el administrador
        manageUsers: {
            type: Boolean,
            default: false
        },
        deleteUsers: {
            type: Boolean,
            default: false
        },
        manageHotels: {
            type: Boolean,
            default: false
        },
        //... Modificar/agregar que permisos tendrían los admin
    }
    
    //Qué otras propiedades agregar al Admin?
});

export default mongoose.model("Admin", AdminSchema);

