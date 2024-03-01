interface Error {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
}

export const validation = ({
  name,
  lastName,
  phoneNumber,
}: Error): { [key: string]: string } => {
  let error: { [key: string]: string } = {};

  // Validaciones para el nombre
  if (!name) {
    // error.name = "This field cannot be blank";
  } else if (!/^[A-Za-z]+$/.test(name)) {
    error.name = "Only letters are allowed";
  }

  // Validaciones para el apellido
  if (!lastName) {
    // error.lastName = "This field cannot be blank";
  } else if (!/^[A-Za-z]+$/.test(lastName)) {
    error.lastName = "Only letters are allowed";
  }

  // Validaciones para el número de teléfono
  if (!phoneNumber) {
    // error.phoneNumber = "This field cannot be blank";
  } else if (!/^\d+$/.test(phoneNumber)) {
    error.phoneNumber = "Only numbers are allowed";
  }

  return error;
};