const appName = "Todo board";
const columns = {
  "d1ea1845-86e2-4c46-976c-8b09ba4786e5": {
    "id": "d1ea1845-86e2-4c46-976c-8b09ba4786e5",
    "name": "To do",
    "tasks": ["a58180ff-2bbf-4327-88a5-1158ea0f50c2", "a58180ff-2bbf-4327-88a5-1158ea0f50c7", "358180ff-2bbf-4327-88a5-1158ea0f50a7", "058180cf-2bbf-4327-88a5-1158ea0f5000", "958180cf-2bbf-4327-88a5-1158ea0f5003", "158180cf-2bbf-4327-88a5-1158ea0f5032", "f58180cf-2bbf-4327-88a5-1158ea0f50aa"]
  },
  "200c95b8-d2f7-4173-b086-33be8ade92b0": {
    "id": "200c95b8-d2f7-4173-b086-33be8ade92b0",
    "name": "Doing",
    "tasks": ["e58180cf-2bbf-4327-88a5-1158ea0f50bb", "058180cf-2bbf-4327-88a5-1158ea0f50cc"]
  },
  "24f4dcf8-b471-488c-a1be-b56ea116e712": {
    "id": "24f4dcf8-b471-488c-a1be-b56ea116e712",
    "name": "Done",
    "tasks": ["c58180cf-2bbf-4327-88a5-1158ea0f50aa", "b58180cf-2bbf-4327-88a5-1158ea0f5097", "858180cf-2bbf-4327-88a5-1158ea0f5015"]
  }
};

const tasks = {
  "a58180ff-2bbf-4327-88a5-1158ea0f50c2": {
    "text": "Buy some swedish cakes"
  },
  "a58180ff-2bbf-4327-88a5-1158ea0f50c7": {
    "text": "Meeting with Steven about his new business idea"
  },
  "358180ff-2bbf-4327-88a5-1158ea0f50a7": {
    "text": "Rewrite Swipeable plugin with React Hooks"
  },
  "058180cf-2bbf-4327-88a5-1158ea0f5000": {
    "text": "Try this new pancackes recepy that everyone is talking about"
  },
  "958180cf-2bbf-4327-88a5-1158ea0f5003": {
    "text": "Doctor appointment at 8:30"
  },
  "158180cf-2bbf-4327-88a5-1158ea0f5032": {
    "text": "Check how is your old friend Bob doing"
  },
  "f58180cf-2bbf-4327-88a5-1158ea0f50aa": {
    "text": "Go to the bank and create a new $$ account with Mastercard"
  },
  "e58180cf-2bbf-4327-88a5-1158ea0f50bb": {
    "text": "Look for a good iPhone offer online"
  },
  "058180cf-2bbf-4327-88a5-1158ea0f50cc": {
    "text": "Throw away this old printer that served well, though"
  },
  "c58180cf-2bbf-4327-88a5-1158ea0f50aa": {
    "text": "Buy new shoes"
  },
  "b58180cf-2bbf-4327-88a5-1158ea0f5097": {
    "text": "Prepare for the PMP exam next week"
  },
  "858180cf-2bbf-4327-88a5-1158ea0f5015": {
    "text": "Be at home on Thursday when the delivery from Amazon is expected"
  }
};

const setDefaultDataIfNotPresent = () => {
  if (!window.localStorage.getItem(appName)) {
    window.localStorage.setItem(appName, JSON.stringify({ columns, tasks }));
  }
}
setDefaultDataIfNotPresent();

const getColumnsData = () => {
  setDefaultDataIfNotPresent();
  return JSON.parse(window.localStorage.getItem(appName)).columns;
};
const setColumnsData = columns => {
  const data = JSON.parse(window.localStorage.getItem(appName));
  data.columns = columns;
  window.localStorage.setItem(appName, JSON.stringify(data));
};

const getTasksData = () => {
  setDefaultDataIfNotPresent();
  return JSON.parse(window.localStorage.getItem(appName)).tasks;
};
const setTasksData = tasks => {
  const data = JSON.parse(window.localStorage.getItem(appName));
  data.tasks = tasks;
  window.localStorage.setItem(appName, JSON.stringify(data));
};

export default {
  loadColumns: () => {
    return Promise.resolve(getColumnsData());
  },
  loadTasks: () => {
    return Promise.resolve(getTasksData());
  },
  deleteTask: id => {
    const tasks = getTasksData();
    delete tasks[id];
    setTasksData(tasks);

    return Promise.resolve(tasks);
  },
  updateTask: (id, data) => {
    const tasks = getTasksData();

    if (tasks[id]) {
      tasks[id] = data;
    }
    setTasksData(tasks);

    return Promise.resolve(tasks);
  },
  createTask: id => {
    const tasks = getTasksData();
    tasks[id] = { id, text: "" };
    setTasksData(tasks);

    return Promise.resolve(tasks[id]);
  },
  updateColumn: (id, data) => {
    const columns = getColumnsData();

    if (columns[id]) {
      columns[id] = data;
    }
    setColumnsData(columns);

    return Promise.resolve(columns);
  }
};
