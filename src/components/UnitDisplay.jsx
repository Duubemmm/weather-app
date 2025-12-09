import IconUnit from "/icon-units.svg";
import IconDropDown from "/icon-dropdown.svg";
import { useState } from "react";

const UnitDisplay = () => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownClick = () => {
    if(isDropDownOpen){
        setIsDropDownOpen(true)
    }
  }
 
  return(
    <>
    <div className="flex text-white bg-700 px-4 py-2 rounded">
        <img src={IconUnit}/>
        <span>Units</span>
        <img src={IconDropDown} onClick={handleDropDownClick}/>
    </div>
    </>
  )

}

export default UnitDisplay;