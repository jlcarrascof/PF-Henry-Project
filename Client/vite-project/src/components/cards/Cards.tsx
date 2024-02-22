import Card from "../card/Card";

interface CardsProps {
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
const Cards: React.FC<CardsProps> = (props: CardsProps) => {
  //const {name, address, price, images} = props;
  return (
    <>
      {props.map(({ id, name, address, price, images }) => (
        <Card
          id={id}
          name={name}
          address={address}
          price={price}
          images={images}
        />
      ))}
      <h1>Holi soy Cards </h1>
    </>
  );
};

export default Cards;
