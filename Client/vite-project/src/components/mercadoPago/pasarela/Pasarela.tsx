import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Types from './Types.ts';
import './Pasarela.css';

/*
/room/hsajdsd-dasdasd
/room/hsajdsd-dasddas
:p xddd :p >:D >:3
*/

initMercadoPago('TEST-90634ea0-ef39-4285-ba3b-3f6daf135572');

const Reservas = Types;
let PagoTotal = 0;
Types.forEach(R => PagoTotal += R.precio * R.dias );

//const [ID, setID] = useState<string>("null");
// e.target.setAttribute('Loading', 'Si');
const orderData: Types.Pasarela.OrderData  =  [];

Reservas.forEach((Reserva) => {
    orderData.push({
        id: Reserva.id,
        unit_price: Reserva.precio,
        quantity: Reserva.dias,
        title: Reserva.titulo
    });
})

let PreferenceID: string = '';
let Succsess = false;

try {
    const Result = await fetch('http://localhost:3002/payment/create-order', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    let Data = await Result.json();
    PreferenceID = Data.id;
    Succsess = true;
    console.log("MP result", Data);
} catch(error) {
    console.log('MP Error: ', error);
}

const Pasarela: React.FC = () => {
    return (
        <div className='Reservas'>
            {Reservas.map((Reserva) => (
                <div className='PasarelaCard'>
                    <img className='PasarelaImg' src={Reserva.image}/>
                    <div className='PasarelaInfo'>
                        <h2 className='PasarelaTitulo'>{Reserva.titulo}</h2>
                        <div className='InfoPrecio'>
                            <div className='InfoReserva'>
                                <span className='PasarelaDias'>Dias: {Reserva.dias}</span>
                                <span className='PasarelaPrecio'>Precio/dia: {Reserva.precio}</span>
                            </div>
                            <div className='PasarelaTotal'>
                                <span className='PasarelaPrecio'>Total: {Reserva.precio * Reserva.dias}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className='Pagos'>
                <div className='PagoDesc'>
                    
            { !Succsess && (<h2>Error al obtener preferenceID</h2>) }
            { Succsess && (<h2>PreferenceID: {PreferenceID}</h2>) }
                </div>
                <div className='PagosTotal'>
                    <span className='TotalPagar'>Pago total: {PagoTotal}</span>
                    <Wallet initialization={{ preferenceId: PreferenceID }}/>
                </div>
            </div>
        </div>
    );
}

export default Pasarela;