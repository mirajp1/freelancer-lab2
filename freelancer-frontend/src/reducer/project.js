const INITIAL_STATE = { error: '', project:{}};

export default function (state = INITIAL_STATE, action) {
    // console.log(action.payload);

    switch(action.type) {
        case "GET_PROJECT":
            return { ...state, project:action.payload };
        case "GET_PROJECT_ERROR":
            return {...state,project:{},error:action.payload.error};
        case "PLACE_BID":
            return { ...state, project:{...state.project,bids:action.payload} };
        case "PLACE_BID_ERROR":
            return {...state,error:action.payload.error};

    }

    return state;
}