import axios from "axios";
import moment from 'moment-timezone';
import Cookies from 'js-cookie';

const URL = process.env.URL;
export const loginFunction = (email, password, navigate) => {
  return axios.post(`${process.env.URL}login`, {
    email: email,
    password: password
  }).then(res => {
    Cookies.set('jwt', res.data, {expires: 30});
    navigate('/');
  });
}

export const registerFunction = (email, password, navigate) => {
  return axios.post(`${process.env.URL}register`, {
    email: email,
    password: password
  }).then(res => {
    Cookies.set('jwt', res.data, {expires: 30});
    navigate('/');
  });
}

export const logout = (navigate) => {
  Cookies.remove('jwt');
  navigate('/login');
}


export const createTask = (text, status, position, timestamp, assignee) => {
  const headers = {
    'Authorization': 'Bearer ' + Cookies.get('jwt'),
  };

  const data = {
    text: text,
    status: status,
    position: position,
    end_date: timestamp,
    assignee: assignee
  };

  return axios.post(`${process.env.URL}api/create-task`, data, {headers: headers})
    .then(res => {
      // handle response
      return res.data;
    })
    .catch(error => {
      // handle error
    });
};


export const getTasks = () => {
  return axios.get(`${process.env.URL}api/tasks`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const deleteTask = (id) => {
  return axios.delete(`${process.env.URL}api/tasks/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
  });
}

export const updateTask = (id, text, status, position, endDate, assignee) => {
  return axios.put(`${process.env.URL}api/tasks/${id}`, {
    text: text,
    status: status,
    position: position,
    end_date: endDate,
    assignee: assignee
  }, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const getItems = () => {
  return axios.get(`${process.env.URL}api/items`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const createItem = (name, quantity, position) => {
  return axios.post(`${process.env.URL}api/create-item`, {
    name: name,
    quantity: quantity,
    position: position,
    assignee: null
  }, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
  });
}

export const deleteItem = (id) => {
  return axios.delete(`${process.env.URL}api/items/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
  });
}

export const updateItem = (id, name, quantity, position) => {
  return axios.put(`${process.env.URL}api/items/${id}`, {
    name: name,
    quantity: quantity,
    position: position
  }, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
  });
}


export const createEvent = (event) => {
  const dateStart = moment(new Date(event.start)).format();
  const dateEnd = moment(new Date(event.end)).format();

  return axios.post(`${process.env.URL}api/create-event`, {
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
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const getEvents = () => {
  return axios.get(`${process.env.URL}api/events`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const getEventById = (id) => {
  return axios.get(`${process.env.URL}api/events/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const updateEvent = (event) => {
  const dateStart = moment(new Date(event.start)).format();
  const dateEnd = moment(new Date(event.end)).format();
  return axios.put(`${process.env.URL}api/events/${event.event_id}`, {
    title: event.title,
    start: dateStart,
    end: dateEnd,
    admin_id: null,
    editable: true,
    deletable: true,
    user_id: event.user_id ?? 3
  }, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
    return res.data;
  });
}

export const deleteEvent = (event) => {
  return axios.delete(`${process.env.URL}api/events/${event}`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwt')
    }
  }).then(res => {
  });
}
