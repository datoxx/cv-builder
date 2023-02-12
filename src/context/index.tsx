import { createContext,  useState } from "react";
import { EducationType } from '../types/index';


export type FormContextProps = {
  children?: JSX.Element | JSX.Element[]
};

export  type GenralInfoType = {
  name?: string;
  surname?: string;
  image?: string;
  about_me?: string;
  email?: string;
  phone_number?: string;
};

type FromsData = {
  name?: string;
  surname?: string;
  email?: string;
  phone_number?: string;
  experiences?: {
      position: string;
      employer: string;
      start_date: string;
      due_date: string;
      description: string;
  }[];
  educations?: {
    institute?: string;
    degree_id?: number;
    due_date?: string;
    description?: string;
  }[];
  image?: string;
  about_me?: string;
}



export const FormContext = createContext<any>({
  generaInfoValues: {},
  setGeneraInfoValues: () => {},
});

const FormsContext = ({children}: FormContextProps) => {

    const [experienceValues, setExperienceValues] = useState()
    const [educations, setEducations] = useState<EducationType[]>([])
    const [image, setImage] = useState("")

    return ( 
      <FormContext.Provider value={{experienceValues, setExperienceValues, educations, setEducations, image, setImage}}>
         { children }
      </FormContext.Provider>
     );
  }
   
  export default FormsContext;
  

  