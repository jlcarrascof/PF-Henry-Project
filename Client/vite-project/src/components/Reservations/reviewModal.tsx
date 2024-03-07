import React, { useState, FormEvent } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import StarRating from '../reviewForm/starRating'; 
import ChangeRating from '../reviewForm/changeRating';
import { revValidation } from '../reviewForm/revValidation'; 
import { useDispatch } from 'react-redux';
import { postReview } from '../../Redux/Actions/actions';

interface Props {
  roomId: string;
}

const ReviewModal: React.FC<Props> = ({ roomId }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    description: '',
    score: 0,
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = revValidation(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(postReview(roomId, formData));
      handleClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Realizar Reseña</Button>
      <Modal
        open={open}
        onClose={handleClose}
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
    </div>
  );
};

export default ReviewModal;