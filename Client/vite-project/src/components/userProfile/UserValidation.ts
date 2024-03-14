interface Error {
  email?: string;
  password?: string;
  repeatPassword?: string;
  phone?: string;
}

export const validation = ({
  email,
  password,
  repeatPassword,
  phone,
}: Error): { [key: string]: string } => {
  let errors: { [key: string]: string } = {};

  // Validaciones para el email
  if (!email) {
    //errors.email = "Este campo no puede estar en blanco";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "The email format is not valid";
  }

  // Validaciones para la contraseña
  if (!password) {
    //errors.password = "Este campo no puede estar en blanco";
  } else if (password.length < 8) {
    errors.password = "The password must have at least 8 characters";
  }

  // Validaciones para la repetición de la contraseña
  if (password !== repeatPassword) {
    errors.repeatPassword = "Passwords must match";
  }

  // Validaciones para el teléfono
  if (phone && !/^\d{10}$/.test(phone)) {
    errors.phone = "The phone number must contain 10 numerical digits";
  }

  return errors;
};   

