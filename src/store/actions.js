export const loadBoardData = () => {
  return fetch("/kanban-board")
    .then(response => response.json())
    .then(data => {
      return Promise.resolve(data);
    });
};

export const saveBoardData = data => {
  return fetch("/kanban-board", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      return Promise.resolve(data);
    });
};
