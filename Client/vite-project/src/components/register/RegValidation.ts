interface Error {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phone?: string;
}

export const validation = ({
  username,
  email,
  firstName,
  lastName,
  dateOfBirth,
  phone,
}: Error): { [key: string]: string } => {
  let error: { [key: string]: string } = {};

  // Validaciones para el nombre
  if (!username) {
   error.username = "This field cannot be blank";
  } else if (!/^[A-Za-z]+$/.test(username)) {
    error.username = "Only letters are allowed";
  }

  if (!email) {
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.email = "Must be a valid email";
  }

  if (!firstName) {
    // error.name = "This field cannot be blank";
  } else if (!/^[A-Za-z]+$/.test(firstName)) {
    error.firstName = "Only letters are allowed";
  }
  
  // Validaciones para el apellido
  if (!lastName) {
    // error.lastName = "This field cannot be blank";
  } else if (!/^[A-Za-z]+$/.test(lastName)) {
    error.lastName = "Only letters are allowed";
  }

  if (!dateOfBirth) {
    // error.lastName = "This field cannot be blank";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    error.dateOfBirth = "Invalid date";
  }

  // Validaciones para el número de teléfono
  if (!phone) {
    // error.phoneNumber = "This field cannot be blank";
  } else if (!/^\d+$/.test(phone)) {
    error.phoneNumber = "Only numbers are allowed";
  }

  return error;
};