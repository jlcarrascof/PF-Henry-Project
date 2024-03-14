export const validateReservationForm = (formData: ReservationFormData): FormErrors => {
    const errors: FormErrors = {};
  
    if (!formData.startDate.trim()) {
      errors.startDate = 'Start date is required.';
    }
  
    if (!formData.endDate.trim()) {
      errors.endDate = 'End date is required.';
    }
  
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
  
      if (start >= end) {
        errors.startDate = 'The start date must be prior to the end date..';
        errors.endDate = 'The end date must be later than the start date..';
      }
    }
   
    const differenceInDays = Math.abs((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      
    if (differenceInDays > 50) {
      errors.endDate = 'The difference between the start date and the end date cannot exceed 50 days.';
    }
    


    return errors;
  }