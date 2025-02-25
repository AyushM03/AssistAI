import "./App.css"
import assistant from "./assets/earth.gif"
import { TfiMicrophone } from "react-icons/tfi";
import { useContext } from "react";
import { DataContext } from "./context/UserContext";
import fingerprint from "./assets/fingerprintLoader.gif"
import robot3d from "./assets/UI Motion Showreel - Sean Cham.gif"
const App = () => {
  const { recognition ,speaking, setSpeaking,promptText,responseprompt,setPromptText, setResponseprompt} = useContext(DataContext);
 
  
  return (
    <div className='main'>
     
      <img id="main-image" src={responseprompt ? robot3d : speaking ? fingerprint : assistant} alt="" />
      <span>I'm AssistAI, A Virtual Assistant</span>
      {!speaking ? <button onClick={() =>{recognition.start(); setResponseprompt(false); setPromptText("Listening..."); setSpeaking(true);} } >Click here <TfiMicrophone />
      </button>: <div className="loader">
        <p>{promptText}</p>
      </div> }

    </div>
  )
}

export default App
