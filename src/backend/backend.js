import axios from "axios";
import {URL} from "./config.js";

export const loginFunction = (email, password, navigate) => {
    return axios.post(`${URL}login`, {
        email: email,
        password: password
    }).then(res => {
        localStorage.setItem('sessionData', JSON.stringify(res.data));
        navigate('/home');
    });
}
export const registerFunction = (email, password, navigate) => {
    console.log(email, password)
    return axios.post(`${URL}register`, {
        email: email,
        password: password
    }).then(res => {
        localStorage.setItem('sessionData', JSON.stringify(res.data));
        navigate('/home');
    });
}

export const logout = (email) => {
    return axios.post(`${URL}api/logout`, {
        email: email
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
            localStorage.removeItem('sessionData');
        }
    );
}


export const createTask = (text, status, position, timestamp) => {
    const headers = {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData')),
    };

    const data = {
        text: text,
        status: status,
        position: position,
        end_date: timestamp
    };

    return axios.post(`${URL}api/create-task`, data, {headers: headers})
        .then(res => {
            // handle response
        })
        .catch(error => {
            // handle error
        });
};


export const getTasks = () => {
    return axios.get(`${URL}api/tasks`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        return res.data;
    });
}

export const deleteTask = (id) => {
    return axios.delete(`${URL}api/tasks/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}

export const updateTask = (id, text, status, position, endDate) => {
    return axios.put(`${URL}api/tasks/${id}`, {
        text: text,
        status: status,
        position: position,
        end_date: endDate
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}

export const getItems = () => {
    return axios.get(`${URL}api/items`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        return res.data;
    });
}

export const createItem = (name, quantity, position) => {
    return axios.post(`${URL}api/create-item`, {
        name: name,
        quantity: quantity,
        position: position
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}

export const deleteItem = (id) => {
    return axios.delete(`${URL}api/items/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}

export const updateItem = (id, name, quantity, position) => {
    return axios.put(`${URL}api/items/${id}`, {
        name: name,
        quantity: quantity,
        position: position
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}


export const createEvent = (event) => {
    return axios.post(`${URL}api/create-event`, {
        title: event.title,
        start: event.start,
        end: event.end,
        color: null,
        admin_id: null,
        editable: true,
        deletable: true
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}

export const getEvents = () => {
    return axios.get(`${URL}api/events`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        return res.data;
    });
}

export const getEventById = (id) => {
    return axios.get(`${URL}api/events/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        return res.data;
    });
}

export const updateEvent = (event) => {
    console.log(event.event_id);
    return axios.put(`${URL}api/events/${event.event_id}`, {
        title: event.title,
        start: event.start,
        end: event.end,
        color: null,
        admin_id: null,
        editable: null,
        deletable: null
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        console.log(res);
    });
}

export const deleteEvent = (event) => {
    console.log(event);
    return axios.delete(`${URL}api/events/${event}`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}
