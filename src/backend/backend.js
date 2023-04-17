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

export const createTask = (text, status, position) => {
    return axios.post(`${URL}api/create-task`, {
        text: text,
        status: status,
        position: position
    }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('sessionData'))
        }
    }).then(res => {
    });
}

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

export const updateTask = (id, text, status, position) => {
    return axios.put(`${URL}api/tasks/${id}`, {
        text: text,
        status: status,
        position: position
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
