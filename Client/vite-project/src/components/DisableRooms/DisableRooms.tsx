import { State } from "../../Redux/Reducer/reducer";
import {useSelector} from "react-redux"
import CardsDisable from "./CardsDisable";
import "./CardDisable.css"

const DisableRooms: React.FC = () => {
    const {allRooms} = useSelector((state: State) => state)

    return (
        <div >
            <CardsDisable allRooms={allRooms}/>
        </div>
    )
}

export default DisableRooms;