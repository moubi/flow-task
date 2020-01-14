export default {
  loadColumns: () => {
    return fetch(`/kanban-board/columns`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  loadTasks: () => {
    return fetch(`/kanban-board/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  deleteTask: id => {
    return fetch(`/kanban-board/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  updateTask: (id, data) => {
    return fetch(`/kanban-board/tasks/${id}`, {
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
    return fetch(`/kanban-board/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data);
      });
  },
  updateColumn: (id, data) => {
    return fetch(`/kanban-board/columns/${id}`, {
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
