import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { getHotelById } from "../../Redux/Actions/actions";
import "./Detail.modules.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentHotel = useSelector((state: State) => state.currentHotel);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Verifica si id es válido
      dispatch(getHotelById(id));
    }
  }, [dispatch, id]);

  const goToCard = () => {
    navigate("/card"); // Cambia "/card" por la ruta de tu tarjeta si es diferente
  };

  return (
    <div className="container">
      <h1>Hotel Detail</h1>
      {currentHotel && (
        <div className="detail">
          <div className="leftColumn">
            {/* Resto del código... */}

            {/* Agregar el botón de regreso a Card */}
            <div className="section">
              <button onClick={goToCard} className="card-button">
                Volver a Card
              </button>
            </div>
          </div>

          <div className="rightColumn">
            {/* Carrusel de imágenes (a futuro) */}
            {currentHotel.images && (
              <div className="imageCarousel">
                {currentHotel.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;



