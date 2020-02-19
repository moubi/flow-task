export default {
  loadColumns: () => {
    return fetch(`/columns`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  loadTasks: () => {
    return fetch(`/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  deleteTask: id => {
    return fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  updateTask: (id, data) => {
    return fetch(`/tasks/${id}`, {
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
    return fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  updateColumn: (id, data) => {
    return fetch(`/columns/${id}`, {
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
