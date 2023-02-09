import { Route, Routes } from "react-router-dom";
import Home from './page/Home';
import GeneralInformation from './page/GeneralInformation';
import Experience from './page/Experience';
import Education from './page/Education';
import Resume from './page/Resume';
import FormsContext from "./context";


function App() {
  return (
      <FormsContext>
        <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/general-information' element={<GeneralInformation />} /> 
            <Route path='/experience' element={<Experience />} />
            <Route path='/education' element={<Education />} />
            <Route path='/resume' element={<Resume />} />
          </Routes>
      </FormsContext>
  );
}

export default App;
