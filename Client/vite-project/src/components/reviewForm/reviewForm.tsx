import { useState } from "react";
import StarRating from "./starRating"
import ChangeRating from "./changeRating"
import {revValidation} from "./revValidation"
import { useDispatch } from "react-redux";
import { postReview } from "../../Redux/Actions/actions";
import "./review.css"

const ReviewForm:React.FC = () => {
  const dispatch = useDispatch() 

    interface Review {
        email: string
        description: string
    }

    const [review, setReview] = useState<Review>({
        email: '',
        description: '',
    })
    interface Errors {
        email?: string;
        description?: string;
      }
    
      const [errors, setErrors] = useState<Errors>({ 
        email: "", 
        description: ""
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
          ...revValidation({ [name]: value })
        });
      };

      const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(postReview(review))
      }
     
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
        {/* {errors.email && <p>{errors.email}</p>} */}
            <ChangeRating rating={avgRating} handleRating={handleRating}></ChangeRating>
            <StarRating stars={avgRating} />
            </div>
            
        <div className="comments"> 
        <label>Description:</label>
        <input
        
          type="text"
          name="description"
          value={review.description}
          onChange={onChange}
          placeholder="enter your comment"
        ></input>
        {/* {errors.description && <p>{errors.description}</p>} */}

        <button type="submit" onSubmit={handleSubmit}>Submit review</button>
        </div>
        
            </form>
        </div>
    )
}

export default ReviewForm