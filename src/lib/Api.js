const appName = "FlowTask";
const columns = {
  "d1ea1845-86e2-4c46-976c-8b09ba4786e5": {
    id: "d1ea1845-86e2-4c46-976c-8b09ba4786e5",
    name: "To do",
    tasks: [
      "a58180ff-2bbf-4327-88a5-1158ea0f50c2",
      "a58180ff-2bbf-4327-88a5-1158ea0f50c7",
      "358180ff-2bbf-4327-88a5-1158ea0f50a7",
      "058180cf-2bbf-4327-88a5-1158ea0f5000",
      "958180cf-2bbf-4327-88a5-1158ea0f5003",
      "158180cf-2bbf-4327-88a5-1158ea0f5032",
      "f58180cf-2bbf-4327-88a5-1158ea0f50aa"
    ]
  },
  "200c95b8-d2f7-4173-b086-33be8ade92b0": {
    id: "200c95b8-d2f7-4173-b086-33be8ade92b0",
    name: "Doing",
    tasks: [
      "e58180cf-2bbf-4327-88a5-1158ea0f50bb",
      "058180cf-2bbf-4327-88a5-1158ea0f50cc"
    ]
  },
  "24f4dcf8-b471-488c-a1be-b56ea116e712": {
    id: "24f4dcf8-b471-488c-a1be-b56ea116e712",
    name: "Done",
    tasks: [
      "c58180cf-2bbf-4327-88a5-1158ea0f50aa",
      "b58180cf-2bbf-4327-88a5-1158ea0f5097",
      "858180cf-2bbf-4327-88a5-1158ea0f5015"
    ]
  }
};

const tasks = {
  "a58180ff-2bbf-4327-88a5-1158ea0f50c2": {
    id: "a58180ff-2bbf-4327-88a5-1158ea0f50c2",
    text: "Buy some swedish cakes",
    lastModifiedDate: 1582900781820
  },
  "a58180ff-2bbf-4327-88a5-1158ea0f50c7": {
    id: "a58180ff-2bbf-4327-88a5-1158ea0f50c7",
    text: "Meeting with Steven about his new business idea",
    lastModifiedDate: 1582900781821
  },
  "358180ff-2bbf-4327-88a5-1158ea0f50a7": {
    id: "358180ff-2bbf-4327-88a5-1158ea0f50a7",
    text: "Rewrite Swipeable plugin with React Hooks",
    lastModifiedDate: 1582900781822
  },
  "058180cf-2bbf-4327-88a5-1158ea0f5000": {
    id: "058180cf-2bbf-4327-88a5-1158ea0f5000",
    text: "Try this new pancackes recepy that everyone is talking about",
    lastModifiedDate: 1582900781823
  },
  "958180cf-2bbf-4327-88a5-1158ea0f5003": {
    id: "958180cf-2bbf-4327-88a5-1158ea0f5003",
    text: "Doctor appointment at 8:30",
    lastModifiedDate: 15829007818324
  },
  "158180cf-2bbf-4327-88a5-1158ea0f5032": {
    id: "158180cf-2bbf-4327-88a5-1158ea0f5032",
    text: "Check how is your old friend Bob doing",
    lastModifiedDate: 1582900781825
  },
  "f58180cf-2bbf-4327-88a5-1158ea0f50aa": {
    id: "f58180cf-2bbf-4327-88a5-1158ea0f50aa",
    text: "Go to the bank and create a new $$ account with Mastercard",
    lastModifiedDate: 1582900781826
  },
  "e58180cf-2bbf-4327-88a5-1158ea0f50bb": {
    id: "e58180cf-2bbf-4327-88a5-1158ea0f50bb",
    text: "Look for a good iPhone offer online",
    lastModifiedDate: 1582900781827
  },
  "058180cf-2bbf-4327-88a5-1158ea0f50cc": {
    id: "058180cf-2bbf-4327-88a5-1158ea0f50cc",
    text: "Throw away this old printer that served well, though",
    lastModifiedDate: 1582900781828
  },
  "c58180cf-2bbf-4327-88a5-1158ea0f50aa": {
    id: "c58180cf-2bbf-4327-88a5-1158ea0f50aa",
    text: "Buy new shoes",
    lastModifiedDate: 1582900781829
  },
  "b58180cf-2bbf-4327-88a5-1158ea0f5097": {
    id: "b58180cf-2bbf-4327-88a5-1158ea0f5097",
    text: "Prepare for the PMP exam next week",
    lastModifiedDate: 1582900781830
  },
  "858180cf-2bbf-4327-88a5-1158ea0f5015": {
    id: "858180cf-2bbf-4327-88a5-1158ea0f5015",
    text: "Be at home on Thursday when the delivery from Amazon is expected",
    lastModifiedDate: 1582900781831
  }
};

const setDefaultDataIfNotPresent = () => {
  if (!window.localStorage.getItem(appName)) {
    window.localStorage.setItem(appName, JSON.stringify({ columns, tasks }));
  }
};
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
  createTask: data => {
    const tasks = getTasksData();
    if (data.id) {
      tasks[data.id] = data;
      setTasksData(tasks);
    }

    return Promise.resolve(tasks[data.id]);
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
