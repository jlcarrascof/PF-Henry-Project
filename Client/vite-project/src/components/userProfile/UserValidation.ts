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
      errors.email = "El formato del correo electrónico no es válido";
    }
  
    // Validaciones para la contraseña
    if (!password) {
      //errors.password = "Este campo no puede estar en blanco";
    } else if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
  
    // Validaciones para la repetición de la contraseña
    if (password !== repeatPassword) {
      errors.repeatPassword = "Las contraseñas deben coincidir";
    }
  
    // Validaciones para el teléfono
    if (phone && !/^\d{10}$/.test(phone)) {
      errors.phone = "El número de teléfono debe contener 10 dígitos numéricos";
    }
  
    return errors;
  }; 
