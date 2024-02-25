import { useState } from "react";

const reviewForm:React.FC = () => {
    interface Review {
        email: string
        score: string
        comments: string
    }

    const [review, setReview] = useState<Review>({
        email: '',
        score: '',
        comments: '',
    })
    interface Errors {
        email?: string;
        score?: string;
        comments?: string;
      }
    
      const [errors, setErrors] = useState<Errors>({ 
        email: "", 
        score: "",
        comments: ""
    });
    
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setReview({
          ...review,
          [name]: value,
        });
        setErrors({
          ...errors,
        //   ...validation({ [name]: value }),
        });
      };
     
    return(
        <div>
            <form>
            <label>Email:</label>
            <input
            type="email"
            name="email"
            value={review.email}
            onChange={onChange}
            placeholder="myexample@gmail.com"
                ></input>
        {/* {errors.email && <p>{errors.email}</p>} */}

        <label>Comments:</label>
        <input
          type="text"
          name="comments"
          value={review.comments}
          onChange={onChange}
          placeholder="enter your comment"
        ></input>
        {/* {errors.password && <p>{errors.password}</p>} */}

        <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default reviewForm