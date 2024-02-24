// Define la estructura de un hotel
export interface Hotel {
    id: number;
    name: string;
    description: string;
    location: string;
    rating: number;
    amenities: string[]; // Suponemos que las comodidades son cadenas
  }