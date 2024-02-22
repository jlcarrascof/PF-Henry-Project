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
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Hotel-room-renaissance-columbus-ohio.jpg/1280px-Hotel-room-renaissance-columbus-ohio.jpg"
        alt=""
      />
      <h1>{props.name}Hotel name</h1>
      <span> {props.address}address </span>
      <span> breve descripcion solo es para ver</span>
      <span> {props.price}price </span>
      <Link to={`/detail/${props.id}`}>
        <button> more.. </button>
      </Link>
    </div>
  );
};

export default Card;
