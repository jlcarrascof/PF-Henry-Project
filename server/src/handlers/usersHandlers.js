const { getUserById, getUserByName, getAllUsers, createUser, updateUser, deleteUserById } = require("../controllers/usersController");
const {ObjectId} = require("mongodb");
const User = require("../models/UserModel")


const getUserID = async (req, res) => {
    try {
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:'Invalid ID'})
        }
        const { id } = req.params;

        const user = await getUserById(id);
        return res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        const { name } = req.query;

        let users;
        if (name) {
            users = await getUserByName(name);
        } else {
            users = await getAllUsers();
        }
        return res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const postUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await createUser(user); 
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const patchUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: 'Invalid ID' });
        }
        const updateData = req.body;

        const success = await updateUser(id, updateData);

        if (success) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found or no changes applied' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const deleteUserByID = async (req, res) => {
    try {
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:'Invalid ID'})
        }
        const { id } = req.params; 

        const result = await deleteUserById(id);

        if (result.deletedCount <= 0) {
           return res.send(400).json({message: "Cannot delete user"})
        }

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: error.message });
    }
};


const createReservation = async (req, res) => {
    try {
        const { userId } = req.params;
        const { startDate, endDate, room, description } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const reservation = {
          startDate,
          endDate,
          room,
          description,
          state: 'pending' 
        };

        console.log("Data de la reserva creada:", reservation)
    
        user.reservation.push(reservation);
        await user.save();
    
        res.status(201).json({ message: 'Reservation created successfully', reservation });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteReservation = async (req, res) => {
    try {
        const { userId, reservationId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Encontrar y eliminar la reserva del usuario
        user.reservation = user.reservation.filter(reservation => reservation._id != reservationId);
        await user.save();
    
        res.status(200).json({ message: 'Reservation deleted successfully', reservationId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getReservations = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('reservation.room'); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json(user.reservation);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}




module.exports = {
    getUserID,
    getUser,
    postUser,
    patchUser,
    deleteUserByID,
    createReservation, 
    getReservations, 
    deleteReservation
};







