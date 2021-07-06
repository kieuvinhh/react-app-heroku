import './App.css';
import "./styles.css";
import React , { useState }from 'react'
import ImageCpn from "./components/ImageCpn.js"
import CameraCpn from "./components/CameraCpn.js"

function App () {
  const [isImageMode, setIsImageMode] = useState(true);

  return (
    <div className="App">
      <div>
        <button onClick={() => setIsImageMode(true)} className="App__upload">
          🤳
        </button>
        <button onClick={() => setIsImageMode(false)} className="App__upload">
          🎥
        </button>
      </div>
      {isImageMode ? <ImageCpn className="App__image"/> : <CameraCpn className="App__image"/>}
      <div>
        
      </div>
    </div>
  );
}


export default App;