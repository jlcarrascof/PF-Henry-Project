const {
  getUserById,
  getUserByName,
  getAllUsers,
  createUser,
  updateUser,
} = require("../controllers/usersController");
const { ObjectId } = require("mongodb");
const User = require("../models/UserModel");
const { getDb } = require("../db");

const authUser = async (req, res) => {
  try {
    let db = getDb();
    const { user_email, password } = req.query

    if (!user_email || !password) {
      return res.status(404).send({error: "Falta informacion"})
    }

    // if( user_email ) {
      const existingUser = await db
      .collection("users")
      .findOne({ user_email }, { password });

    if (!existingUser) {
      res.status(404).send({ error: "Usuario no encontrado" });
      return;
    }
    // }
    const username = existingUser.username;
    const message = `Welcome ${username}`;

    res.status(200).send({
      Message: message,
      Status: "OK",
      userData: existingUser,
    });
  } catch (error) {
    res.status(500).send({ error: "No pudo autenticarse" });
  }
};

const postUser = async (req, res) => {
  let db = getDb();
  try {
    const {
      username,
      uid,
      user_email,
      image,
      password,
      role,
      permissions,
      firstName,
      lastName,
      dateOfBirth,
      phone,
    } = req.body;

    // const existingUser = await db.collection("users").findOne({ user_email });

    // if (existingUser) {
    //   res.status(400).send({ error: "Usuario repetido" });
    //   return;
    // }
    const newUser = new User({
      username,
      uid,
      user_email,
      password,
      image,
      isDisabled: false,
      role,
      permissions,
      profile: {
        firstName,
        lastName,
        dateOfBirth,
      },
      dateOfBirth,
      phone,
    });
    const savedUser = await createUser(newUser);

    res.status(201).send(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al crear el usuario" });
  }
};

const getUserID = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const { id } = req.params;

    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const patchUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const updateData = req.body;

    const success = await updateUser(id, updateData);


    if (success) {
      const user = await getUserById(id);
    return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ error: "User not found or no changes applied" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const createReservation = async (req, res) => {
  try {
    let db = getDb();
    const { userId } = req.params;
    const { startDate, endDate, roomId, description, user_email } = req.body;

    const user = await db
      .collection("users")
      .findOne({ $or: [{ user_email: user_email }, { uid: userId }] });

    if (!user) {
      console.log("No se encontró usuario en la base de datos");
      return res.status(404).json({ error: "User not found" });
    }

    const reservation = {
      user_id: userId,
      billing_id: "some_billing_id",
      billing_status: "Pending",
      startDate,
      endDate,
      state: "pending",
      room: roomId,
      description,
    };

    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(user._id) }, { $push: { reservation } });

    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { userId, reservationId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Encontrar y eliminar la reserva del usuario
    user.reservation = user.reservation.filter(
      (reservation) => reservation._id != reservationId
    );
    await user.save();

    res
      .status(200)
      .json({ message: "Reservation deleted successfully", reservationId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReservations = async (req, res) => {
  try {
    let db = getDb();
    //const userId = req.params.userId;
    //const { user_email } = req.body;
    const user_email = req.params.useruser_email;
    const identifier = req.params.identifier;

    //const user = await db.collection("users").findOne({ user_email: user_email });
    const user = await db
      .collection("users")
      .findOne({ $or: [{ uid: identifier }, { user_email: identifier }] });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ error: "User not found" });
    }

    // Aquí obtén todas las reservas del usuario
    const reservations = user.reservation;

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getConfirmedReservations = async (req, res) => {
  try {
    let db = getDb();
    //const { userId } = req.params;

    // Buscar al usuario por su ID
    //const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    const user_email = req.params.user_email;
    const identifier = req.params.identifier;

    //const user = await db.collection("users").findOne({ user_email: useruser_email });
    const user = await db
      .collection("users")
      .findOne({ $or: [{ uid: identifier }, { user_email: identifier }] });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filtrar las reservas confirmadas y pagadas del usuario
    const confirmedReservations = user.reservation.filter(
      (reservation) =>
        reservation.state === "confirmed" &&
        reservation.billing_status === "Accepted"
    );

    res.status(200).json(confirmedReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFavoriteRooms = async (req, res) => {
  try {
    const { identifier } = req.params;

    const db = getDb();

    const user = await db
      .collection("users")
      .findOne({ $or: [{ uid: identifier }, { user_email: identifier }] });

    if (!user) {
      console.log("No se encontró el usuario :(");
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteRoomIds = user.favorites.map(
      (roomId) => new ObjectId(roomId)
    );

    const favoriteRooms = await db
      .collection("rooms")
      .find({ _id: { $in: favoriteRoomIds } })
      .toArray();
    res.status(200).json(favoriteRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addFavoriteRoom = async (req, res) => {
  try {
    const { identifier, roomId } = req.params;

    const db = getDb();
    const user = await db.collection("users").findOneAndUpdate(
      {
        $or: [{ uid: identifier }, { user_email: identifier }],
        favorites: { $ne: roomId },
      },
      { $addToSet: { favorites: roomId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeFavoriteRoom = async (req, res) => {
  try {
    const { identifier, roomId } = req.params;

    const db = getDb();
    const user = await db
      .collection("users")
      .findOneAndUpdate(
        { $or: [{ uid: identifier }, { user_email: identifier }] },
        { $pull: { favorites: roomId } },
        { new: true }
      );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserID,
  postUser,
  authUser,
  patchUser,
  createReservation,
  getReservations,
  deleteReservation,
  getConfirmedReservations,
  getFavoriteRooms,
  addFavoriteRoom,
  removeFavoriteRoom,
};