interface Error {
  email?: string;
  password?: string;
}

export const validation = ({
  email,
  password,
}: Error): { [key: string]: string } => {
  let error: { [key: string]: string } = {};

  //?------------------------------------------------------------------------------EMAIL
  if (!email) {
    error.email = "This field cannot be blank";
  }
  if (email && email.length > 40) {
    error.email = "The length of the email cannot exceed 40 digits";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    error.email = "Ingrese un email válido";
  }
  //?------------------------------------------------------------------------------PASSWORD
  if (!password) {
    error.password = "This field cannot be blank";
  }
  if (password && (password.length > 12 || password.length < 8)) {
    error.password =
      "The length of the password must be in between 8 and 12 digits";
  }
  if (password && !/^[A-Za-z0-9\s]+$/g.test(password)) {
    error.password = "The password must have at least one special character";
  }
  return error;
};
