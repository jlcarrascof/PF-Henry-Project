const { getUserById, getUserByName, getAllUsers, createUser, updateUser, deleteUserById } = require("../controllers/usersController");

const getUserID = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
          return res.status(400).json({error:'ID not provided in route parameters '})
        }

        const user = await getUserById(id);
        res.status(200).json(user);

    } catch (error) {
        console.error('Error fetching user by ID:', error);
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
        res.status(200).json(users);


    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).json({ error: error.message });
    }
};



const postUser = async (req, res) => {
    try {
        const { name, otros, datos } = req.body;
        const newUser = await createUser(
          name, 
          otros, 
          datos
        );
       
        res.status(201).json(newUser);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
};



const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;


        if (!id) {
            return res.status(400).json({ error: 'ID not provided in route parameters' });
        }

        const result = await updateUser(id, updateData);

        if (result) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: error.message });
    }
};



const deleteUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID not provided in route parameters' });
        }

        const result = await deleteUserById(id);

        if (result === 'User removed') {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
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




