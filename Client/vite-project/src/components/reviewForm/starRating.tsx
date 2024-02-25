
const maxStars: number = 5;

interface StarRatingProps {
  stars: number;
}

const StarRating: React.FC<StarRatingProps> = ({ stars }) => {
    const starPercentage: number = (stars / maxStars) * 100;

  const starPercentageRounded: number = Math.round(starPercentage);

  const StarStyles = () => {
    return {
      width: `${starPercentageRounded}%`
    };
  };
    return(
        <div className="stars-gray">
      <div className="stars-yellow" style={StarStyles()}></div>
        </div>
    )
}

export default StarRating