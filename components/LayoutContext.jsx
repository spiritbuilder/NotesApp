import React, {useState,createContext} from "react"


export const LayoutContext= createContext()

export const LayoutProvider =({children})=>{
    const [singlelayout, setSingleLayout]=useState(true)

    return(
        <LayoutContext.Provider>
            {children}
        </LayoutContext.Provider>
    )
}
