import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../Redux/Reducer/reducer';
import { getHotelById } from '../../Redux/Actions/actions';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const currentHotel = useSelector((state: State) => state.currentHotel);

  useEffect(() => {
    dispatch(getHotelById(id));
  }, [dispatch, id]);

  return (
    <>
      <h1>Hotel Detail</h1>
      {currentHotel && (
        <div>
          <h2>{currentHotel.name}</h2>
          <p>Address: {currentHotel.address}</p>
          <p>Details: {currentHotel.details}</p>
          {/* Agreguen la info que quieran renderizar */}
        </div>
      )}
    </>
  );
};

export default Detail;