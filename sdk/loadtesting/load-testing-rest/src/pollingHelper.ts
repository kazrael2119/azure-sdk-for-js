// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureLoadTestingClient } from "./clientDefinitions.js";
import { getFileValidationPoller } from "./getFileValidationPoller.js";
import { getTestRunCompletionPoller } from "./getTestRunCompletionPoller.js";
import type {
  FileUploadAndValidatePoller,
  TestUploadFileSuccessResponse,
  TestRunCompletionPoller,
  TestRunCreateOrUpdateSuccessResponse,
} from "./models.js";

export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestUploadFileSuccessResponse,
): Promise<FileUploadAndValidatePoller>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestRunCreateOrUpdateSuccessResponse,
): Promise<TestRunCompletionPoller>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestRunCreateOrUpdateSuccessResponse | TestUploadFileSuccessResponse,
): Promise<TestRunCompletionPoller | FileUploadAndValidatePoller> {
  if (isFileUpload(initialResponse)) {
    return getFileValidationPoller(client, initialResponse);
  } else if (isTestRunCreation(initialResponse)) {
    return getTestRunCompletionPoller(client, initialResponse);
  }
  throw new Error("The Operation is not a long running operation.");
}

function isFileUpload(response: any): response is TestUploadFileSuccessResponse {
  return response.request.url.includes("/files/");
}

function isTestRunCreation(response: any): response is TestRunCreateOrUpdateSuccessResponse {
  return response.request.url.includes("/test-runs/");
}
