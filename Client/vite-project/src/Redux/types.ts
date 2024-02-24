// Define la estructura de las acciones en tu aplicación
export interface Action {
  type: string;
  payload: any; // Ajusta este tipo según la estructura de datos de tus acciones
}

// Definición de tipos para Hotel
export interface Hotel {
  _id: string;
  name: string;
  owner: string; // ObjectId del propietario del hotel
  details: string;
  address?: string;
  services?: string[];
  rooms: {
    description: string;
    typeOfRoom: string;
    price: number;
    availability: boolean;
  }[];
  images?: string[];
  contact: {
    phone?: number;
    mail?: string;
  };
  reviews: {
    _id: string;
    description: string;
    score: number;
    client: string; // ObjectId del cliente que dejó la reseña
    date: Date;
  }[];
}

// Definición de tipos para User
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'client' | 'owner'; // Enumera los roles permitidos
  permissions?: ('read' | 'write')[];
  contactDetails?: {
    phone?: number;
    address?: string;
  };
  profile?: {
    firstName?: string;
    lastName?: string;
    birthdate?: Date;
  };
  reservations?: {
    _id: string;
    reservationMade: Date;
    startDate: Date;
    endDate: Date;
    state: 'pending' | 'confirmed' | 'cancelled'; // Enumera los estados permitidos
    hotel: string; // ObjectId del hotel reservado
    description: string;
  }[];
}