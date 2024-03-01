import { State } from "../../Redux/Reducer/reducer";
import CardsLanding from "../cardsLanding/CardsLanding";
import {useSelector} from "react-redux"

const borradoLog: React.FC = () => {
   const {allRooms} = useSelector((state: State) => state)
    return (
        <div>
            <CardsLanding allRooms={allRooms}/>
        </div>
    )
}

export default borradoLog;