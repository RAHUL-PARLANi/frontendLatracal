import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './components/Homepage';

function App() {
  return (
    <div >
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<Homepage/>}/>
         </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
