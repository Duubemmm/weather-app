import { useState } from "react"
import IconUnit from "/icon-units.svg"
import IconDropDown from "/icon-dropdown.svg"
const UnitsDropDown = () => {
    const [ dropDown, setDropDown] = useState(false)
const unitClick = () => {
    if(!dropDown){
        setDropDown(true)
    }
}
    return(
    <section>
 <div onClick={unitClick} 
 className="flex p-1 bg-[#3d3b5eff] text-white space-x-3 rounded">
    <img src={IconUnit} className="w-5 h-auto"/>
    Units
    <img src={IconDropDown} className="w-5 h-auto ml-2"/>
 </div>
    </section>
)
}
export default UnitsDropDown;