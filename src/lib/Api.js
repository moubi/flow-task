export default {
  loadColumns: () => {
    return fetch(`api/columns/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  loadTasks: () => {
    return fetch(`api/tasks/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  deleteTask: id => {
    return fetch(`api/tasks/?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  updateTask: (id, data) => {
    return fetch(`api/tasks/?id=${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  createTask: id => {
    return fetch(`api/tasks/?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  updateColumn: (id, data) => {
    return fetch(`api/columns/?id=${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  }
};
