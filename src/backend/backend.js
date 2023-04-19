import axios from "axios";
import {URL} from "./config.js";
import moment from 'moment-timezone';

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
    const dateStart = moment(new Date(event.start)).format();
    const dateEnd = moment(new Date(event.end)).format();

    return axios.post(`${URL}api/create-event`, {
        title: event.title,
        start: dateStart,
        end: dateEnd,
        color: null,
        admin_id: null,
        editable: true,
        deletable: true,
        user_id: event.user_id ?? 3
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        return res.data;
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
    const dateStart = moment(new Date(event.start)).format();
    const dateEnd = moment(new Date(event.end)).format();
    return axios.put(`${URL}api/events/${event.event_id}`, {
        title: event.title,
        start: dateStart,
        end: dateEnd,
        admin_id: null,
        editable: true,
        deletable: true,
        user_id: event.user_id ?? 3
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
        return res.data;
    });
}

export const deleteEvent = (event) => {
    return axios.delete(`${URL}api/events/${event}`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}
