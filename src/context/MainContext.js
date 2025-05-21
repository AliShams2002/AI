import { createContext, useState } from "react";


export const MainContext = createContext({
    sidebarIsOpen: false,
    setSidebarIsOpen: () => {}
})

const SidebarMainContext = ({children}) => {

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    return(
        <MainContext.Provider value={{
            sidebarIsOpen,
            setSidebarIsOpen
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default SidebarMainContext;