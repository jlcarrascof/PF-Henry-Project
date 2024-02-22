const { getUserById, getUserByName, getAllUsers, createUser, updateUser, deleteUserById } = require("../controllers/usersController");
const {ObjectId} = require("mongodb");


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


//Para el User por name y para todos los Users
const getUser = async (req, res) => {
    try {
        const { name } = req.query;

        let users;
        if (name) {//Mostrar user por Nombre
            users = await getUserByName(name);
        } else {//Mostrar todos los users
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
    // Se realizaron cambios para traer el body completo sin destructurar propiedades
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
//
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

module.exports = {
    getUserID,
    getUser,
    postUser,
    patchUser,
    deleteUserByID
};




