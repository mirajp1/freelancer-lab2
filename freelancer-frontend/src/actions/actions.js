import * as API from '../api/auth';

export function loginUser(payload) {

    console.log(payload);

    return function(dispatch) {
        API.login(payload)
            .then(res => {

                if(!res.error){
                    console.log("no error");
                    console.log(res);
                    dispatch({
                        type:"LOGIN_USER",
                        payload:res
                    });
                    // localStorage.setItem('jwtToken', res.token);
                    if(res.user){
                        localStorage.setItem('userId', res.user._id);
                        window.location.href = '/profile';

                    }
                    else{
                        console.log("user id not there");
                    }
                }
                else{
                    console.log("error");
                    dispatch({
                        type:"LOGIN_USER_ERROR",
                        payload:res
                    });
                }
            })

    }

}

export function signUpUser(payload) {

    console.log(payload);

    return function(dispatch) {
        API.login(payload)
            .then(res => {

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"SIGNUP_USER",
                        payload:res
                    });
                    window.location.href = '/login';
                }
                else{
                    console.log("error");
                    dispatch({
                        type:"SIGNUP_USER_ERROR",
                        payload:res
                    });
                }
            })

    }

}

export function registerUser(payload) {
    return function(dispatch) {
        API.signup(payload)
            .then(res => {
                dispatch({
                   type:"SIGNUP_USER",
                    payload:res.data
                });



            })

    }
}

export function fetchProfile(token, params) {

    console.log(token+":"+params);
    return function(dispatch) {
        API.getProfile(token,params)
            .then(res => {
                console.log(res);

                dispatch({
                    type:"GET_PROFILE",
                    payload:res
                });

            })

    }

}

export function updateProfile(token, data) {

    console.log("update profile"+data);
    return function(dispatch) {
        API.updateProfile(token,data)
            .then(res => {
                console.log(res);

                if(!res.error) {
                    dispatch({
                        type: "UPDATE_PROFILE",
                        payload: res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type: "UPDATE_PROFILE_ERROR",
                        payload: res
                    });
                }

            })

    }

}

export function fetchProject(token, params) {

    console.log("fetch_project:"+params);
    return function(dispatch) {
        API.getProject(token,params)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"GET_PROJECT",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"GET_PROJECT_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function placeBid(token, data,params) {

    console.log("put bid:"+params);
    return function(dispatch) {
        API.placeBid(token,data,params)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"PLACE_BID",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"PLACE_BID_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function hire(token, data,params) {

    console.log("hire"+params);
    return function(dispatch) {
        API.hire(token,data,params)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"HIRE",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"HIRE_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function submitSolution(token,data,params) {

    console.log("submit solution"+params);
    return function(dispatch) {
        API.submitSolution(token,data,params)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"SUBMIT_SOLUTION",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"SUBMIT_SOLUTION_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function fetchAllOpenProjects(token) {

    console.log("fetch all open project:");
    return function(dispatch) {
        API.getAllOpenProjects(token)
            .then(res => {
                console.log("response open projecst:");
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"GET_All_OPEN_PROJECTS",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"GET_ALL_OPEN_PROJECTS_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function fetchFreelancerProjects(token) {

    console.log("fetch all freelancer project:");
    return function(dispatch) {
        API.getFreelancerProjects(token)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"GET_FREELANCER_PROJECTS",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"GET_DASHBOARD_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function fetchEmployerProjects(token) {

    console.log("fetch all employer projects:");
    return function(dispatch) {
        API.getEmployerProjects(token)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"GET_EMPLOYER_PROJECTS",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"GET_DASHBOARD_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function fetchRelevantProjects(token) {

    console.log("fetch all relevant projects:");
    return function(dispatch) {
        API.getRelevantProjects(token)
            .then(res => {
                console.log(res);

                if(!res.error){
                    console.log("no error");
                    dispatch({
                        type:"GET_ALL_RELEVANT_PROJECTS",
                        payload:res
                    });
                }
                else{
                    console.log(res.error);
                    dispatch({
                        type:"GET_ALL_RELEVANT_PROJECTS_ERROR",
                        payload:res
                    });
                }

            })

    }

}

export function addProject(token, project) {

    console.log("adding project:"+token+":"+project);
    return function(dispatch) {
        API.addProject(token,project)
            .then(res => {
                console.log(res);

                if(!res.error){
                    dispatch({
                        type:"ADD_PROJECT",
                        payload:res
                    });

                    if(res._id)
                        window.location.href = '/projects/'+res._id;

                }
                else{
                    dispatch({
                        type:"ADD_PROJECT_ERROR",
                        payload:res
                    });
                }
            })

    }

}


// export function protectedTest() {
//     return function(dispatch) {
//         axios.get(`${API_URL}/protected`, {
//             headers: { 'Authorization': cookie.load('token') }
//         })
//             .then(response => {
//                 dispatch({
//                     type: PROTECTED_TEST,
//                     payload: response.data.content
//                 });
//             })
//             .catch((error) => {
//                 errorHandler(dispatch, error.response, AUTH_ERROR)
//             });
//     }
// }