interface Error {
    email?: string;
    comment?: string;
  }
  
  export const revValidation = ({
    email,
    comment,
  }: Error): { [key: string]: string } => {
    let error: { [key: string]: string } = {};
  
    //?------------------------------------------------------------------------------EMAIL
    if (!email) {
      error.email = "This field cannot be blank";
    } else if (email.length > 40) {
      error.email = "The length of the email cannot exceed 40 digits";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      error.email = "That email is not valid";
    }
    //?------------------------------------------------------------------------------PASSWORD
    if (!comment) {
      error.password = "This field cannot be blank";
    }
    return error;
  };



