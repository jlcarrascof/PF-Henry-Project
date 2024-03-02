interface Error {
  name?: string;
  details?: string;
  address?: string;
  contact?: {
    phone?: string;
    mail?: string;
  };
}

const hotelValidation = ({ name, details, address, contact }: Error) => {
  let error: Error = {};
  if (!name) {
    error.name = "This field cannot be blank";
  } else if (name && !/^[A-Za-z]+$/.test(name)) {
    error.name = "Only letters are allowed";
  } else if (name && name.length < 4) {
    error.name = "That name is too short";
  }

  if (!details) {
    error.details = "This field cannot be blank";
  } else if (details && details.length < 25) {
    error.details = "The details must have at least 25 characters";
  }

  if (!address) {
    error.address = "This field cannot be blank";
  } else if (name && name.length < 4) {
    error.address = "That address is too short";
  }

  if (!contact?.phone) {
    error.contact?.phone = "This field cannot be blank";
  } else if (
    contact?.phone &&
    !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
      contact?.phone
    )
  ) {
    error.contact?.phone = "That email is not valid";
  }

  if (!contact?.mail) {
    error.contact?.mail = "This field cannot be blank";
  } else if (
    contact?.mail &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact?.mail)
  ) {
    error.contact?.mail = "That email is not valid";
  }
  return error;
};
