import expect from "../testUtils/unexpected-react";

import Api from "./Api";

describe("Api", () => {
  const api = Api;

  it("should load all columns", async () => {
    const payload = await api.loadColumns();

    // Default columns data in Api.js
    expect(payload, "to exhaustively satisfy", {
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
    });
  });

  it("should load all tasks", async () => {
    const payload = await api.loadTasks();

    // Default tasks data in Api.js
    expect(payload, "to exhaustively satisfy", {
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
        text:
          "Be at home on Thursday when the delivery from Amazon is expected",
        lastModifiedDate: 1582900781831
      }
    });
  });

  it("should delete a task", async () => {
    const payload = await api.deleteTask("zy1bx7fyfrb");

    expect(payload, "to not have key", "zy1bx7fyfrb");
  });

  it("should update a task", async () => {
    // Initial task before the update:
    // "xmtia6ohms0": {
    //   id: "xmtia6ohms0"
    //   text: "Meeting with Steven about his new business idea",
    //   lastModifiedDate: 1582900781821
    // }
    const payload = await api.updateTask("xmtia6ohms0", {
      id: "xmtia6ohms0",
      text: "Task with new text",
      lastModifiedDate: 1582900781999
    });

    expect(payload, "to have a value exhaustively satisfying", {
      id: "xmtia6ohms0",
      text: "Task with new text",
      lastModifiedDate: 1582900781999
    });
  });

  it("should create a task", async () => {
    const payload = await api.createTask({
      id: "2",
      text: "This is a new task",
      lastModifiedDate: 1582900781444
    });

    expect(payload, "to exhaustively satisfy", {
      id: "2",
      text: "This is a new task",
      lastModifiedDate: 1582900781444
    });
  });

  it("should update a column", async () => {
    const payload = await api.updateColumn("kl6w18uqrli", {
      id: "kl6w18uqrli",
      name: "To do",
      tasks: ["zy1bx7fyfrb"]
    });

    expect(payload, "to have a value exhaustively satisfying", {
      id: "kl6w18uqrli",
      name: "To do",
      tasks: ["zy1bx7fyfrb"]
    });
  });
});
