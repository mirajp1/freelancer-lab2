const INITIAL_STATE = { error: ''};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case "ADD_PROJECT":
            return { ...state, error: '' };
        case "ADD_PROJECT_ERROR":
            return { ...state, error: action.payload.error };


    }

    return state;
}