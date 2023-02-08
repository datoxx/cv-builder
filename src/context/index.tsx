import { createContext,  useState } from "react";

export const StoreContext = createContext({});

export type FormContextProps = {
    children?: JSX.Element | JSX.Element[]
  };

const FormsContext = ({children}: FormContextProps) => {

    const [contextImage, setContextImage] = useState();

    return ( 
      <StoreContext.Provider value={{contextImage, setContextImage}}>
      { children }
      </StoreContext.Provider>
     );
  }
   
  export default FormsContext;
  

  