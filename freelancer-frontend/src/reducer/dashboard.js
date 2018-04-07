const INITIAL_STATE = { error: '', fprojects:[],eprojects:[]};

export default function (state = INITIAL_STATE, action) {
    // console.log(action.payload);

    switch(action.type) {
        case "GET_FREELANCER_PROJECTS":
            return { ...state, fprojects:action.payload };
        case "GET_EMPLOYER_PROJECTS":
            return { ...state, eprojects:action.payload };
        case "GET_DASHBOARD_ERROR":
            return {...state,error:action.payload.error};

    }

    return state;
}