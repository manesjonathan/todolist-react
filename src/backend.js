import axios from "axios";
const url = `https://api.jonathan-manes.be/`;

export const loginFunction = (email, password, navigate) => {
    return axios.post(`https://api.jonathan-manes.be/login`, {
        email: email,
        password: password
    }).then(res => {
        console.log(res)
        sessionStorage.setItem('user', res.data);
        navigate("/home");
    });
}

export const createTask = (text, status) => {
    return axios.post(`${url}api/create-task`, {
        text: text,
        status: status
    }).then(res => {
        console.log(res)
    });
}

export const getTasks = () => {
    return axios.get(`${url}api/tasks`).then(res => {
        console.log(res.data)
        return res.data;
    });
}

export const deleteTask = (id) => {
    return axios.delete(`${url}api/tasks/${id}`).then(res => {
        console.log(res)
    });
}

export const updateTask = (id, text, status) => {
    return axios.put(`${url}api/tasks/${id}`, {
        text: text,
        status: status
    }).then(res => {
        console.log(res)
    });
}
