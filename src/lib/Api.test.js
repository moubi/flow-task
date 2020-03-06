import expect from "../testUtils/unexpected-react";

import Api from "./Api";

describe("Api", () => {
  const api = Api;

  it("should load all columns", async () => {
    const payload = await api.loadColumns();

    // Default columns data in Api.js
    expect(payload, "to exhaustively satisfy", {
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
    });
  });

  it("should load all tasks", async () => {
    const payload = await api.loadTasks();

    // Default tasks data in Api.js
    expect(payload, "to exhaustively satisfy", {
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
        text:
          "Be at home on Thursday when the delivery from Amazon is expected",
        lastModifiedDate: 1582900781831
      }
    });
  });

  it("should delete a task", async () => {
    const payload = await api.deleteTask(
      "a58180ff-2bbf-4327-88a5-1158ea0f50c2"
    );

    expect(payload, "to not have key", "a58180ff-2bbf-4327-88a5-1158ea0f50c2");
  });

  it("should update a task", async () => {
    // Initial task before the update:
    // "a58180ff-2bbf-4327-88a5-1158ea0f50c7": {
    //   text: "Meeting with Steven about his new business idea",
    //   lastModifiedDate: 1582900781821
    // }
    const payload = await api.updateTask(
      "a58180ff-2bbf-4327-88a5-1158ea0f50c7",
      {
        text: "Task with new text",
        lastModifiedDate: 1582900781999
      }
    );

    expect(payload, "to have a value exhaustively satisfying", {
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
    const payload = await api.updateColumn(
      "d1ea1845-86e2-4c46-976c-8b09ba4786e5",
      {
        id: "d1ea1845-86e2-4c46-976c-8b09ba4786e5",
        name: "To do",
        tasks: ["a58180ff-2bbf-4327-88a5-1158ea0f50c2"]
      }
    );

    expect(payload, "to have a value exhaustively satisfying", {
      id: "d1ea1845-86e2-4c46-976c-8b09ba4786e5",
      name: "To do",
      tasks: ["a58180ff-2bbf-4327-88a5-1158ea0f50c2"]
    });
  });
});
