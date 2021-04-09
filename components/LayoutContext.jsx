import React, {useState,createContext} from "react"


export const LayoutContext= createContext()

export const LayoutProvider =({children})=>{
    const [singleLayout, setSingleLayout]=useState(true)

    return(
        <LayoutContext.Provider value={[singleLayout, setSingleLayout]}>
            {children}
        </LayoutContext.Provider>
    )
}
