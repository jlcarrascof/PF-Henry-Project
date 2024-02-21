import { Link } from "react-router-dom";

interface CardC {
  id?: string;
  name: string;
  address: string;
  price: string;
  images: ImageC[];
}

interface ImageC {
  url: string;
  alt: string;
}

const Card: React.FC<CardC> = (props: CardC) => {
  return (
    <div>
      <Link to={}>
        {" "}
        <h1>Holi soy Card</h1>
      </Link>
    </div>
  );
};

export default Card;
