namespace Types {
    export namespace Pasarela {
        export type OrderData = Array<{
            id: string,           // id
            // description?: string, 
            unit_price: number,   // Precio
            quantity: number,     // Dias
            title: string         // Titulo
        }>;
        export type ReservInfo = {
            id: string,
            image: string,
            titulo: string,
            precio: number,
            dias: number,
        }
    }
}

//aqui irian las habitaciones que se reservaron en el carrito, se recorrerian y se renderizarian aqui para pasarla en la pasarela :).

const Types: Array<Types.Pasarela.ReservInfo> = [
    { image: '/public/vite.svg', id: 'XXX-XX-XXXX-Y', titulo: 'Hotel Buena Playa', precio: 400, dias: 4 },
    { image: '/public/vite.svg', id: 'XXX-XX-XXXX-Y', titulo: 'Hotel Buena bosque', precio: 500, dias: 3 },
    { image: '/public/vite.svg', id: 'XXX-XX-XXXX-U', titulo: 'Hotel Chichi', precio: 20, dias: 7 },
    { image: '/public/vite.svg', id: 'XXX-XX-XXXX-X', titulo: 'Hotel Playa Blanca', precio: 100, dias: 2 }
]

export default Types;