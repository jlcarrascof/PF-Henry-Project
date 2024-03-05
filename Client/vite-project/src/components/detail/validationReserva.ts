export const validateReservationForm = (formData: ReservationFormData): FormErrors => {
    const errors: FormErrors = {};
  
    if (!formData.startDate.trim()) {
      errors.startDate = 'La fecha de inicio es requerida.';
    }
  
    if (!formData.endDate.trim()) {
      errors.endDate = 'La fecha de fin es requerida.';
    }
  
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
  
      if (start >= end) {
        errors.startDate = 'La fecha de inicio debe ser anterior a la fecha de fin.';
        errors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio.';
      }
    }
  
    if (!formData.description.trim()) {
      errors.description = 'La descripción es requerida.';
    }
  
    return errors;
  };