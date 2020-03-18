const appName = "FlowTask";
const columns = {
  kl6w18uqrli: {
    id: "kl6w18uqrli",
    name: "To do",
    tasks: [
      "zy1bx7fyfrb",
      "xmtia6ohms0",
      "rzg2osmn5ba",
      "y47dprqg32y",
      "mb8suubnax1",
      "cdc454qe5fd",
      "q29oswkdvzk"
    ]
  },
  emrjor03vl9: {
    id: "emrjor03vl9",
    name: "Doing",
    tasks: ["jxkvc7ysxva", "zkvdswly9d8"]
  },
  selp4hn9uoj: {
    id: "selp4hn9uoj",
    name: "Done",
    tasks: ["qxkream0i7o", "m1t8j2bf3q7", "k9s6xw4wprt"]
  }
};

const tasks = {
  zy1bx7fyfrb: {
    id: "zy1bx7fyfrb",
    text: "Buy some swedish cakes",
    lastModifiedDate: 1582900781820
  },
  xmtia6ohms0: {
    id: "xmtia6ohms0",
    text: "Meeting with Steven about his new business idea",
    lastModifiedDate: 1582900781821
  },
  rzg2osmn5ba: {
    id: "rzg2osmn5ba",
    text: "Rewrite Swipeable plugin with React Hooks",
    lastModifiedDate: 1582900781822
  },
  y47dprqg32y: {
    id: "y47dprqg32y",
    text: "Try this new pancackes recepy that everyone is talking about",
    lastModifiedDate: 1582900781823
  },
  mb8suubnax1: {
    id: "mb8suubnax1",
    text: "Doctor appointment at 8:30",
    lastModifiedDate: 15829007818324
  },
  cdc454qe5fd: {
    id: "cdc454qe5fd",
    text: "Check how is your old friend Bob doing",
    lastModifiedDate: 1582900781825
  },
  q29oswkdvzk: {
    id: "q29oswkdvzk",
    text: "Go to the bank and create a new $$ account with Mastercard",
    lastModifiedDate: 1582900781826
  },
  jxkvc7ysxva: {
    id: "jxkvc7ysxva",
    text: "Look for a good iPhone offer online",
    lastModifiedDate: 1582900781827
  },
  zkvdswly9d8: {
    id: "zkvdswly9d8",
    text: "Throw away this old printer that served well, though",
    lastModifiedDate: 1582900781828
  },
  qxkream0i7o: {
    id: "qxkream0i7o",
    text: "Buy new shoes",
    lastModifiedDate: 1582900781829
  },
  m1t8j2bf3q7: {
    id: "m1t8j2bf3q7",
    text: "Prepare for the PMP exam next week",
    lastModifiedDate: 1582900781830
  },
  k9s6xw4wprt: {
    id: "k9s6xw4wprt",
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
