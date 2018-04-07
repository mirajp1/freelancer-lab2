const INITIAL_STATE = { error: '', projects:[]};

export default function (state = INITIAL_STATE, action) {
    // console.log(action.payload);

    switch(action.type) {
        case "GET_All_OPEN_PROJECTS":
            return { ...state, projects:action.payload };
        case "GET_ALL_OPEN_PROJECTS_ERROR":
            return {...state,projects:[],error:action.payload.error};

    }

    return state;
}