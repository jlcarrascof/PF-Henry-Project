import { Action } from '../../Redux/types'; // Ajusta la ruta según la ubicación real de tu archivo types.ts

// Define un tipo para el estado combinado
export interface RootState {
  action: Action; // Define el tipo de acción
  user: User; // Define el tipo de usuario
  // Otros tipos de datos de tu aplicación, si los tienes
}