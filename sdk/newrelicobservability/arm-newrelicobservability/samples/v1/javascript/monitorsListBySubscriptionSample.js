/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List NewRelicMonitorResource resources by subscription ID
 *
 * @summary List NewRelicMonitorResource resources by subscription ID
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2022-07-01/examples/Monitors_ListBySubscription_MaximumSet_Gen.json
 */
async function monitorsListBySubscriptionMaximumSetGen() {
  const subscriptionId = process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "hfmjmpyqgezxkp";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.monitors.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  monitorsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);