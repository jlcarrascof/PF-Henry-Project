import './ratingStyles.css'

interface ChangeRatingProps {
    rating: number;
    handleRating: (rating: number) => void;
  }
  
  const ChangeRating: React.FC<ChangeRatingProps> = (props) => {
    return (
      <input
        type="number"
        step="0.5"
        min="0"
        max="5"
        value={props.rating}
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (inputValue > 5) {
            alert("Input numbers in between 0 and 5 only ;)");
          } else {
            props.handleRating(inputValue);
          }
        }}
      />
    );
  };
  
  export default ChangeRating;





  