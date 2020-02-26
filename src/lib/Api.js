const headers = { "Content-Type": "application/json" };

export default {
  loadColumns: () => {
    return fetch(`/columns`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  loadTasks: () => {
    return fetch(`/tasks`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  deleteTask: id => {
    return fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  updateTask: (id, data) => {
    return fetch(`/tasks/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  createTask: id => {
    return fetch(`/tasks/${id}`, {
      method: "PUT",
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  },
  updateColumn: (id, data) => {
    return fetch(`/columns/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data));
  }
};
