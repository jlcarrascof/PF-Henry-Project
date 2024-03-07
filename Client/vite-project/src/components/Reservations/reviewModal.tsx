// import React, { useState } from 'react';
// import { Modal, Box, Typography, Button, TextField } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { postReview } from '../../Redux/Actions/actions';

// interface Props {
//   roomId: string;
//   onClose: () => void;
// }

// const ReviewModal: React.FC<Props> = ({ roomId, onClose }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     description: '',
//     score: 0,
//     date: new Date().toISOString().split('T')[0],
//   });
//   const [errors, setErrors] = useState<any>({});
//   const dispatch = useDispatch();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(postReview(roomId, formData)).then(() => {
//       onClose(); // Cerrar el modal después de enviar la reseña
//     });
//   };

//   return (
//     <Modal
//       open={!!roomId} // Abre el modal si roomId está definido
//       onClose={onClose} // Cierra el modal cuando se hace clic fuera de él
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           width: 400,
//         }}
//       >
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Realizar Reseña
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             name="email"
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={formData.email}
//             onChange={handleInputChange}
//             error={!!errors.email}
//             helperText={errors.email}
//             margin="normal"
//           />
//           <TextField
//             name="description"
//             label="Descripción"
//             variant="outlined"
//             fullWidth
//             value={formData.description}
//             onChange={handleInputChange}
//             error={!!errors.description}
//             helperText={errors.description}
//             margin="normal"
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Enviar Reseña
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default ReviewModal;



import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postReview } from '../../Redux/Actions/actions';
import ChangeRating from '../reviewForm/changeRating';

interface Props {
  roomId: string;
  onClose: () => void;
}

const ReviewModal: React.FC<Props> = ({ roomId, onClose }) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postReview(roomId, formData)).then(() => {
      onClose(); // Cerrar el modal después de enviar la reseña
    });
  };

  return (
    <Modal
      open={!!roomId} // Abre el modal si roomId está definido
      onClose={onClose} // Cierra el modal cuando se hace clic fuera de él
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




