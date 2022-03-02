import React, { useContext, useState } from "react";
import Main from "./components/Main";
import LanguageDropdown from "./components/LanguageDropdown";
import strings from "./config/strings";

const defaultGlobalState = {
    language: localStorage.getItem('language') ?? navigator.language
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