interface Error {
  name?: string;
  details?: string;
  address?: string;
  contact?: {
    phone?: number;
    mail?: string;
  };
}

const hotelValidation = ({ name, details, address, contact }: Error) => {
  let error: Error;
  if (!name) {
    error.name = "This field cannot be blank";
  }
  if (name && !/^[A-Za-z]+$/.test(name)) {
    error.name = "Only letters are allowed";
  }
  if (name && name.length < 4) {
    error.name = "That name is too short";
  }

  if (!details) {
    error.details = "This field cannot be blank";
  }

  if (details && details.length < 20) {
    error.details = "The details must have at least 20 characters";
  }

  if (!address) {
    error.address = "This field cannot be blank";
  }
  if (name && name.length < 4) {
    error.name = "That address is too short";
  }

  if (!contact?.phone) {
    error.name = "This field cannot be blank";
  }

  if (!contact?.mail) {
    error.contact?.mail = "This field cannot be blank";
  }
  if (
    contact?.mail &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact.mail)
  ) {
    error.contact?.mail = "That email is not valid";
  }
  return error;
};
