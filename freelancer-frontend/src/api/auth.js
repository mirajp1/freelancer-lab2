const headers = {
    'Accept': 'application/json'
};

export const login = (payload) =>{
    console.log(payload);
    return fetch("/auth/login", {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',

        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const logout = () =>{
    return fetch("/auth/logout", {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',

        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const signup = (payload) =>{

    return fetch("/auth/signup", {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'credentials':'true'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}
export const addMoney = (payload) =>{

    return fetch("/api/profile/addmoney", {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'credentials':'true'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const withdrawMoney = (payload) =>{

    return fetch("/api/profile/withdrawmoney", {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'credentials':'true'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const makePayment = (params) =>{

    return fetch("/api/projects/"+params+"/payment", {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'credentials':'true'
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getProfile = (token,params) =>{

    return fetch("/api/profile/"+params, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
            'credentials':'true'
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

// export const addProject = (token,project) =>{
//
//     return fetch("/api/projects/", {
//         method: 'POST',
//         headers: {
//             ...headers,
//             'Authorization': token,
//             'Content-Type': 'application/json',
//             'credentials':'true'
//         },
//         body: JSON.stringify(project)
//     }).then(res => {
//         console.log(res);
//         return res.json();
//     })
//         .catch(error => {
//             console.log(error);
//             return error;
//         });
// }

export const addProject = (token,project) =>{

    return fetch("/api/projects/", {
        method: 'POST',
        headers: {
            ...headers,
            'Authorization': token,
            'credentials':'true'
        },
        credentials:'include',
        body: project
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const updateProfile = (token,profile) =>{

    return fetch("/api/profile/", {
        method: 'PUT',
        headers: {
            ...headers,
            'Authorization': token,
            'credentials':'true'
        },
        credentials:'include',
        body: profile

    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const submitSolution = (token,solution,params) =>{

    return fetch("/api/projects/"+params+"/solution", {
        method: 'POST',
        headers: {
            ...headers,
            'Authorization': token,
            'credentials':'true'
        },
        credentials:'include',
        body: solution

    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getProject = (token,params) =>{

    return fetch("/api/projects/"+params, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
            'credentials':'true'
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}


export const placeBid = (token,data,params) =>{

    return fetch("/api/projects/"+params+"/bid", {
        method: 'POST',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body:JSON.stringify(data)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const hire = (token,data,params) =>{

    return fetch("/api/projects/"+params+"/hire", {
        method: 'POST',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body:JSON.stringify(data)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}


export const getAllOpenProjects = (token,query) =>{

    return fetch("/api/projects/all/open?"+query, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getFreelancerProjects = (token,query) =>{

    return fetch("/api/projects/all/bidded?"+query, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getEmployerProjects = (token,query) =>{

    return fetch("/api/projects/all/created?"+query, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export const getRelevantProjects = (token,query) =>{

    return fetch("/api/projects/all/relevant?"+query, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        credentials:'include',
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log(error);
            return error;
        });
}