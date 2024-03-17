import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postReview } from '../../Redux/Actions/actions';
import ChangeRating from '../reviewForm/changeRating';
import StarRating from '../reviewForm/starRating';

interface Props {
  roomId: string;
  onClose: () => void;
  onSubmitReview: () => void;
}

const ReviewModal: React.FC<Props> = ({ roomId, onClose, onSubmitReview }) => {
  const [formData, setFormData] = useState({
    email: '',
    description: '',
    score: 0,
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      score: rating,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting review:', formData); // Verificar que se están enviando los datos correctamente
    try {
      const response = await dispatch(postReview(roomId, formData));
      console.log('Post review response:', response); // Verificar la respuesta del servidor
     
        onSubmitReview();
        onClose();
     
    } catch (error) {
      console.error('Error posting review:', error); // Manejar errores si ocurren
      // Handle error if needed
    }
  };

  return (
    <Modal
      open={!!roomId}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Realizar Reseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <div>
            <Typography>Calificación:</Typography>
            <ChangeRating rating={formData.score} handleRating={handleRatingChange} />
            <StarRating stars={formData.score} />
          </div>
          <TextField
            name="description"
            label="Descripción"
            variant="outlined"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar Reseña
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ReviewModal;