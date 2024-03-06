import { State } from "../../../Redux/Reducer/reducer";
import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import CardsDisable from "./CardsDisable";
import "./CardDisable.css"
import { getDisabledRooms } from "../../../Redux/Actions/actions";
//
const DisableRooms: React.FC = () => {
    const {allAdminRooms} = useSelector((state: State) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDisabledRooms())
    }, [])    

    return (
        <div >
            <CardsDisable allAdminRooms={allAdminRooms}/>
        </div>
    )
}

export default DisableRooms;