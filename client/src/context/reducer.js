import {GET_FILTER_DATA} from "./action"

import {initialState} from "./appContext"

const reducer = (state, action)=>{
    if(action.type === GET_FILTER_DATA){
        const {msg} = action.payload;
        console.log('action',action);
        return{
            action
        }
    }
}

export default reducer;