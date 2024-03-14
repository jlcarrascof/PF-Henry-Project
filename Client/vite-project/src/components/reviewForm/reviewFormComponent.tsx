import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../Redux/Actions/actions";

const ReviewFormComponent: React.FC<{ roomId: string }> = ({ roomId }) => {
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState<any>({});

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(postReview(roomId, reviewData)); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  return (
    <form >
      <input type="text" name="comment" onChange={handleChange} />
      <input type="number" name="rating" onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>Submit review</button>
    </form>
  );
};

export default ReviewFormComponent;
