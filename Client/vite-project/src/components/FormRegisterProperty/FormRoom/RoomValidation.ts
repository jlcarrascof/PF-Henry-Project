interface Error {
  description?: string;
  typeOfRoom?: string;
  services?: string;
  price?: string;
  num_rooms?: string;
  images?: string;
}

export const roomValidation = ({
  description,
  typeOfRoom,
  services,
  price,
  num_rooms,
  images,
}: Error) => {
  let error: Error = {};

  if (!description) {
    error.description = "This field cannot be blank";
  } else if (description && description.length < 25) {
    error.description = "The description must have at least 25 characters";
  } else if (description && /[!@#$%^&*()]/g.test(description)) {
    error.description = "The description can't contain special characters";
  }

  if (!typeOfRoom) {
    error.typeOfRoom = "This field cannot be blank";
  } else if (typeOfRoom && /[!@#$%^&*()]/g.test(typeOfRoom)) {
    error.typeOfRoom = "Only letters are allowed";
  } else if (typeOfRoom && typeOfRoom.length < 4) {
    error.typeOfRoom = "That name is too short";
  }

  if (!services) {
    error.services = "The room must have at least one service";
  }

  if (!price) {
    error.price = "This field cannot be blank";
  } else if (!/\d+/g.test(price)) {
    error.price = "The price must be numbers";
  }

  if (!num_rooms) {
    error.num_rooms = "This field cannot be blank";
  } else if (!/\d+/g.test(num_rooms)) {
    error.num_rooms = "The number of rooms must be numbers";
  }

  if (!images) {
    error.images = "This field cannot be blank";
  }
};
