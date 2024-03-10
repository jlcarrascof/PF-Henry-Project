import { format, differenceInYears } from "date-fns";

interface Error {
  username?: string;
  email?: string;
  lastName?: string;
  dateOfBirth?: string;
  phone?: string;
  password?: string;
  repeatPassword?: string;
}

export const validation = ({
  username,
  email,
  lastName,
  dateOfBirth,
  phone,
  password,
  repeatPassword,
}: Error): { [key: string]: string } => {
  let error: { [key: string]: string } = {};

  // Validaciones para el nombre de usuario
  if (!username) {
    error.username = "This field cannot be blank";
  } else if (!/^[A-Za-z]+$/.test(username)) {
    error.username = "Only letters allowed";
  }

  // Validaciones para el email
  if (!email) {
    error.email = "This field cannot be blank";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.email = "It must be a valid email";
  }

  // Validaciones para el apellido
  if (!lastName) {
    error.lastName = "This field cannot be blank";
  } else if (!/^[A-Za-zÁ-Úá-ú\s]+$/.test(lastName)) {
    error.lastName = "Only letters allowed";
  }

  // Validaciones para la fecha de nacimiento
  if (!dateOfBirth) {
    error.dateOfBirth = "This field cannot be blank";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    error.dateOfBirth = "Invalid date";
  } else {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = differenceInYears(currentDate, birthDate);

    if (age < 18) {
      error.dateOfBirth = "You must be over 18 years old";
    } else {
      // Si la edad es mayor o igual a 18, se limpia el error
      delete error.dateOfBirth;
    }
  }

  // Validaciones para el número de teléfono
  if (!phone) {
    error.phone = "This field cannot be blank";
  } else if (!/^\d+$/.test(phone)) {
    error.phone = "Only numbers allowed";
  }

  // Validaciones para la contraseña
  if (!password) {
    error.password = "This field cannot be blank";
  } else if (password && password.length < 8) {
    error.password = "The password should be at least 8 characters long";
  }
  // } else if (
  //   /^(?!.\s)(?=.[A-Za-z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/.test(
  //     password
  //   )
  // ) {
  //   error.password =
  //     "The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)";
  // }

  // Validaciones para la repetición de la contraseña
  if (password !== repeatPassword) {
    error.repeatPassword = "Passwords must match";
  }

  return error;
};
