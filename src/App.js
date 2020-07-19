import React from 'react';
import MainPage from './pages/main'
import 'semantic-ui-css/semantic.min.css'
import './app.css'
function App() {
  return (


    <div>
      <header id="header">
        <div className="logo" id="logo">Casas Magalhães</div>
      </header>
        <div style={{ display:'flex', flexDirection:'column'}} >
           <MainPage /> 
        </div>
    </div>
  );
}

export default App;
