import FormHotel from "./formHotel/FormHotel";
import FormRoom from './FormRoom/FormRoom'
import React, {useState} from "react";

const FormProperty = () => {
    const [stepRegister, setStepRegister] = useState(1)

    return (
        <div>
           {stepRegister === 1 ? (
                <FormHotel setStepRegister={setStepRegister}/>
            ) : (
                <FormRoom/>
            )}
        </div>
    )
}

export default FormProperty