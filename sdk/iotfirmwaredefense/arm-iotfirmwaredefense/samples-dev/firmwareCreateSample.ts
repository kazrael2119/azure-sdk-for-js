/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  Firmware,
  IoTFirmwareDefenseClient
} from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to create a firmware.
 *
 * @summary The operation to create a firmware.
 * x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Create_MaximumSet_Gen.json
 */
async function firmwareCreateMaximumSetGen() {
  const subscriptionId =
    process.env["IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID"] ||
    "685C0C6F-9867-4B1C-A534-AA3A05B54BCE";
  const resourceGroupName =
    process.env["IOTFIRMWAREDEFENSE_RESOURCE_GROUP"] ||
    "rgworkspaces-firmwares";
  const workspaceName = "A7";
  const firmwareId = "umrkdttp";
  const firmware: Firmware = {
    description: "uz",
    fileName: "wresexxulcdsdd",
    fileSize: 17,
    model: "f",
    status: "Pending",
    statusMessages: [{ message: "ulvhmhokezathzzauiitu" }],
    vendor: "vycmdhgtmepcptyoubztiuudpkcpd",
    version: "s"
  };
  const credential = new DefaultAzureCredential();
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwareOperations.create(
    resourceGroupName,
    workspaceName,
    firmwareId,
    firmware
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create a firmware.
 *
 * @summary The operation to create a firmware.
 * x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Create_MinimumSet_Gen.json
 */
async function firmwareCreateMinimumSetGen() {
  const subscriptionId =
    process.env["IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID"] ||
    "685C0C6F-9867-4B1C-A534-AA3A05B54BCE";
  const resourceGroupName =
    process.env["IOTFIRMWAREDEFENSE_RESOURCE_GROUP"] ||
    "rgworkspaces-firmwares";
  const workspaceName = "A7";
  const firmwareId = "umrkdttp";
  const firmware: Firmware = {};
  const credential = new DefaultAzureCredential();
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.firmwareOperations.create(
    resourceGroupName,
    workspaceName,
    firmwareId,
    firmware
  );
  console.log(result);
}

async function main() {
  firmwareCreateMaximumSetGen();
  firmwareCreateMinimumSetGen();
}

main().catch(console.error);