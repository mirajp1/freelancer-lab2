const INITIAL_STATE = { error: '', all_projects:[],relevant_projects:[]};

export default function (state = INITIAL_STATE, action) {
    // console.log(action.payload);

    switch(action.type) {
        case "GET_All_OPEN_PROJECTS":
            return { ...state, all_projects:action.payload };
        case "GET_ALL_OPEN_PROJECTS_ERROR":
            return {...state,error:action.payload.error};
        case "GET_ALL_RELEVANT_PROJECTS":
            return { ...state, relevant_projects:action.payload };
        case "GET_ALL_RELEVANT_PROJECTS_ERROR":
            return {...state,error:action.payload.error};

    }

    return state;
}