import { State } from "../../Redux/Reducer/reducer";
import {useSelector} from "react-redux"
import CardsBorrado from "./CardsBorrado";
import "./CardBorrado.css"

const BorradoLog: React.FC = () => {
    const {allRooms} = useSelector((state: State) => state)

    return (
        <div className="borrado-grid">
            <CardsBorrado allRooms={allRooms}/>
        </div>
    )
}

export default BorradoLog;