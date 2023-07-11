/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Delete a PostRulesResource
 *
 * @summary Delete a PostRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2022-08-29/examples/PostRules_Delete_MaximumSet_Gen.json
 */
async function postRulesDeleteMaximumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.beginDeleteAndWait(globalRulestackName, priority);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a PostRulesResource
 *
 * @summary Delete a PostRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2022-08-29/examples/PostRules_Delete_MinimumSet_Gen.json
 */
async function postRulesDeleteMinimumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.beginDeleteAndWait(globalRulestackName, priority);
  console.log(result);
}

async function main() {
  postRulesDeleteMaximumSetGen();
  postRulesDeleteMinimumSetGen();
}

main().catch(console.error);