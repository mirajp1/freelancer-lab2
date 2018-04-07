const INITIAL_STATE = { error: '', profile:{}};

export default function (state = INITIAL_STATE, action) {
    // console.log(action.payload);

    switch(action.type) {
        case "GET_PROFILE":
            return { ...state, profile:action.payload };
        case "UPDATE_PROFILE":
            return { ...state,profile:{...state.profile,image:action.payload.image,name:action.payload.name,about:action.payload.about,phone:action.payload.phone}};
        case "UPDATE_PROFILE_ERROR":
            return { ...state,error:action.payload.error};

    }

    return state;
}