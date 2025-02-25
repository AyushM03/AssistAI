import { createContext, useState, useContext } from "react";
import React from 'react';
import run from "../gemini";

export const DataContext = createContext();
const UserContext = ({children}) => {

    let [speaking, setSpeaking]=useState(false);
    const [promptText, setPromptText] = useState("Listening...")
    const [responseprompt, setResponseprompt] = useState(false )
    function speak(text){
        let textSpeak = new SpeechSynthesisUtterance(text);
        textSpeak.volume = 1;
        textSpeak.pitch = 1; // 0-2, default 1
        textSpeak.rate = 1; // 0-2, default 1
        textSpeak.lang = "en-US";
        window.speechSynthesis.speak(textSpeak);
    }
    async function aiResponse(prompt) {
        let text = await run(prompt);
        // Splitting words with ***, **, and * to skip them
        text = text.split('***').join(' ').split('**').join(' ').split('*').join(' ');
        setPromptText(text);
        speak(text);
        setResponseprompt(true)
        setTimeout(()=>{
            setSpeaking(false)
        },5000)
        
    }

    let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

    let recognition = new speechRecognition();
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript;
        setPromptText(transcript);
        aiResponse(transcript);
    };

    let value = {
        recognition,speaking, setSpeaking,setPromptText, promptText, responseprompt, setResponseprompt
    };

    return (
        <div>
            <DataContext.Provider value={value}>{children}</DataContext.Provider>
        </div>
    );
};

export default UserContext;
