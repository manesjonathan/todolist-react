import axios from "axios";

const url = `https://api.jonathan-manes.be/`;

export const loginFunction = (email, password, navigate) => {
    return axios.post(`https://api.jonathan-manes.be/login`, {
        email: email,
        password: password
    }).then(res => {
        sessionStorage.setItem('user', res.data);
        navigate('/home');
    });
}
export const registerFunction = (email, password, navigate) => {
    console.log(email, password)
    return axios.post(`https://api.jonathan-manes.be/register`, {
        email: email,
        password: password
    }).then(res => {
        sessionStorage.setItem('user', res.data);
        navigate('/home');
    });
}

export const createTask = (text, status, position) => {
    return axios.post(`${url}api/create-task`, {
        text: text,
        status: status,
        position: position
    }).then(res => {
    });
}

export const getTasks = () => {
    return axios.get(`${url}api/tasks`).then(res => {
        return res.data;
    });
}

export const deleteTask = (id) => {
    return axios.delete(`${url}api/tasks/${id}`).then(res => {
    });
}

export const updateTask = (id, text, status, position) => {
    return axios.put(`${url}api/tasks/${id}`, {
        text: text,
        status: status,
        position: position
    }).then(res => {
    });
}

export const logout = (email) => {
    return axios.post(`${url}api/logout`, {
        email: email
    });
}
