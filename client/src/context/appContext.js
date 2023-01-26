import { useEffect, useReducer, useContext } from "react";
import React from "react";
import axios from "axios";
import {toast} from "react-toastify"
import reducer from "./reducer"
import {GET_FILTER_DATA} from "./action"

const initialState = {
    //Filter data
    proteinValue: 0,
    sugarValue: 0,
    selectedValue: 0,
    isActive: false,
    isVeganActive: false,
}

const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const getFilter = ({proteinValue,sugarValue})=>{
        try {
            dispatch({
                type: GET_FILTER_DATA,
                payload: {
                    proteinValue: proteinValue,
                    sugarValue: sugarValue
                }
             });
        } catch (error) {
            console.log(error.response);
        }
    }
    return(
        <AppContext.Provider
         value={{
            ...state,
            getFilter
         }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}