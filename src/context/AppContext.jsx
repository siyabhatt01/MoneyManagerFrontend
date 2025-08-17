const { createContext, useState } = require("react");

//create context
const AppContext=createContext(); 

//provide context
export const AppContextProvider = ({children})=>{

    const [user,setUser]=useState(null);

    const contextValue={
        user
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
