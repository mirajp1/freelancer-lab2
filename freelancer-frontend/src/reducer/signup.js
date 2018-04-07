const INITIAL_STATE = { error: '', user: ''};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case "SIGNUP_USER":
            return { ...state, error: '', message: '',user:action.payload.user, authenticated: true };
        case "SIGNUP_USER_ERROR":
            return { ...state, error: action.payload.error, message: '',user:{}, authenticated: false };


    }

    return state;
}