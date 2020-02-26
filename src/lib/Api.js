const headers = { "Content-Type": "application/json" };

export default {
  loadColumns: () => {
    return fetch(`api/columns/`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  loadTasks: () => {
    return fetch(`api/tasks/`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  deleteTask: id => {
    return fetch(`api/tasks/?id=${id}`, {
      method: "DELETE",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  updateTask: (id, data) => {
    return fetch(`api/tasks/?id=${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  createTask: id => {
    return fetch(`api/tasks/?id=${id}`, {
      method: "PUT",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  updateColumn: (id, data) => {
    return fetch(`api/columns/?id=${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  }
};
