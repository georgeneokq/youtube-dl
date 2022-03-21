import React, { useContext, useState } from "react";
import Main from "./components/Main";
import LanguageDropdown from "./components/LanguageDropdown";
import { strings } from "./config/strings";

function getLanguage(): string {
    if(localStorage.getItem('language'))
        return localStorage.getItem('language')

    // Search through user's preferred languages.
    // If any one of them is a language supported by this app, use that language.
    // Note that english could be 'en-US', 'en-GB', etc instead of just 'en'
    for(const language of navigator.languages)
        if(Object.keys(strings).includes(language))
            return language
    
    // If none of the user's preferred languages are supported, default to 'en'
    return 'en'
}

const defaultGlobalState = {
    language: getLanguage()
}

export const globalContext = React.createContext(defaultGlobalState);

export default function App() {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({...state, ...newValue}),
        defaultGlobalState
    );
        
    const onLanguageChange = (selection: string) => {
        // Write to global state
        dispatch({language: selection});
    
        // Write to localStorage
        localStorage.language = selection;
    }

    return (
        <div id="main-container">
            <div id="language-dropdown">
                {strings[state.language].LANGUAGE}: <LanguageDropdown defaultValue={defaultGlobalState.language} onChange={onLanguageChange} />
            </div>
            <globalContext.Provider value={state}>
                <Main />
            </globalContext.Provider>
        </div>
    )
}