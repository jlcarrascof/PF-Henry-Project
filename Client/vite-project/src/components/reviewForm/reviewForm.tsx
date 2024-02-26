import { useState } from "react";
import StarRating from "./starRating"
import ChangeRating from "./changeRating"
import revValidation from "./revValidation"
import "./review.css"

const ReviewForm:React.FC = () => {
    interface Review {
        email: string
        comments: string
    }

    const [review, setReview] = useState<Review>({
        email: '',
        comments: '',
    })
    interface Errors {
        email?: string;
        comments?: string;
      }
    
      const [errors, setErrors] = useState<Errors>({ 
        email: "", 
        comments: ""
    });

    const [avgRating, setAvgRating] = useState<number>(0);

    const handleRating = (input: number) => {
        setAvgRating(input);
    };
    
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setReview({
          ...review,
          [name]: value,
        });
        setErrors({
          ...errors,
        //   ...revValidation({ [name]: value })
        });
      };
     
    return(
        <div className='revContainer'>
            
            <form>
            <h2> Leave a review! </h2>
            <div className='email'>
            <label>Email:</label>
            <input
            type="email"
            name="email"
            value={review.email}
            onChange={onChange}
            placeholder="myexample@gmail.com"
            ></input>
        {errors.email && <p>{errors.email}</p>}
            <ChangeRating rating={avgRating} handleRating={handleRating}></ChangeRating>
            <StarRating stars={avgRating} />
            </div>
            
        <div className="comments"> 
        <label>Comments:</label>
        <input
        
          type="text"
          name="comments"
          value={review.comments}
          onChange={onChange}
          placeholder="enter your comment"
        ></input>
        {errors.comments && <p>{errors.comments}</p>}

        <button type="submit">Submit review</button>
        </div>
        
            </form>
        </div>
    )
}

export default ReviewForm