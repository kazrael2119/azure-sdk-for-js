// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - files", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectsClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(agents);
  });

  it("should list files", async function () {
    const files = await agents.listFiles();
    assert.isNotEmpty(files);
  });

  it("should upload file", async function () {
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const file = await agents.uploadFile(fileContent, "assistants", { fileName: "fileName" });
    assert.isNotEmpty(file);
  });

  it("should upload file and poll", async function () {
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const poller = agents.uploadFileAndPoll(fileContent, "assistants", {
      fileName: "fileName",
      pollingOptions: { sleepIntervalInMs: 1000 },
    });
    const file = await poller.pollUntilDone();
    assert.notInclude(["uploaded", "pending", "running"], file.status);
    assert.isNotEmpty(file);
  });

  it("should delete file", async function () {
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const file = await agents.uploadFile(fileContent, "assistants", { fileName: "fileName" });
    const deleted = await agents.deleteFile(file.id);
    assert.isNotNull(deleted);
  });

  it("should retrieve file", async function () {
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const file = await agents.uploadFile(fileContent, "assistants", { fileName: "fileName" });
    const _file = await agents.getFile(file.id);
    assert.isNotEmpty(_file);
    assert.equal(_file.id, file.id);
    await agents.deleteFile(file.id);
  });
});
