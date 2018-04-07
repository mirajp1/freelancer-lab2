const INITIAL_STATE = { error: '', message: '', user: '', authenticated: false};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case "LOGIN_USER":
            return { ...state, error: '', message: '',user:action.payload.user, authenticated: true };
        case "LOGIN_USER_ERROR":
            return { ...state, error: action.payload.error, message: '',user:{}, authenticated: false };


    }

    return state;
}