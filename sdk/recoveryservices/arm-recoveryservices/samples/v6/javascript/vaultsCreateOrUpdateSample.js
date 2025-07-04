/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault.json
 */
async function createOrUpdateRecoveryServicesVault() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: { publicNetworkAccess: "Enabled" },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault_WithMonitoringSettings.json
 */
async function createOrUpdateVaultWithMonitoringSetting() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: {
      monitoringSettings: {
        azureMonitorAlertSettings: {
          alertsForAllFailoverIssues: "Disabled",
          alertsForAllJobFailures: "Enabled",
          alertsForAllReplicationIssues: "Enabled",
        },
        classicAlertSettings: {
          alertsForCriticalOperations: "Disabled",
          emailNotificationsForSiteRecovery: "Enabled",
        },
      },
      publicNetworkAccess: "Enabled",
    },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault_WithRedundancySettings.json
 */
async function createOrUpdateVaultWithRedundancySetting() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: {
      publicNetworkAccess: "Enabled",
      redundancySettings: {
        crossRegionRestore: "Enabled",
        standardTierStorageRedundancy: "GeoRedundant",
      },
    },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault_ResourceGuardEnabled.json
 */
async function createOrUpdateVaultPerformingCriticalOperationWithMua() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c30844f42Add2746ebb7e97b2/resourcegroups/defaultrg/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
    location: "West US",
    properties: {
      encryption: {
        infrastructureEncryption: "Enabled",
        kekIdentity: {
          userAssignedIdentity:
            "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi",
        },
        keyVaultProperties: {
          keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
        },
      },
      publicNetworkAccess: "Enabled",
      resourceGuardOperationRequests: [
        "/subscriptions/38304e13-357e-405e-9e9a-220351dcce8c/resourcegroups/ankurResourceGuard1/providers/Microsoft.DataProtection/resourceGuards/ResourceGuard38-1/modifyEncryptionSettings/default",
      ],
    },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault_WithCMK.json
 */
async function createOrUpdateVaultWithCustomerManagedKeys() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c30844f42Add2746ebb7e97b2/resourcegroups/defaultrg/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
    location: "West US",
    properties: {
      encryption: {
        infrastructureEncryption: "Enabled",
        kekIdentity: {
          userAssignedIdentity:
            "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi",
        },
        keyVaultProperties: {
          keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
        },
      },
      publicNetworkAccess: "Enabled",
    },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault_WithSourceScanConfiguration.json
 */
async function createOrUpdateVaultWithSourceScanConfiguration() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: {
      publicNetworkAccess: "Enabled",
      securitySettings: {
        sourceScanConfiguration: {
          sourceScanIdentity: { operationIdentityType: "SystemAssigned" },
          state: "Enabled",
        },
      },
    },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Recovery Services vault.
 *
 * @summary Creates or updates a Recovery Services vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/PUTVault_WithUserAssignedIdentity.json
 */
async function createOrUpdateVaultWithUserAssignedIdentity() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] || "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const vault = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c30844f42Add2746ebb7e97b2/resourcegroups/defaultrg/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
    location: "West US",
    properties: { publicNetworkAccess: "Enabled" },
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vaultName,
    vault,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateRecoveryServicesVault();
  await createOrUpdateVaultWithMonitoringSetting();
  await createOrUpdateVaultWithRedundancySetting();
  await createOrUpdateVaultPerformingCriticalOperationWithMua();
  await createOrUpdateVaultWithCustomerManagedKeys();
  await createOrUpdateVaultWithSourceScanConfiguration();
  await createOrUpdateVaultWithUserAssignedIdentity();
}

main().catch(console.error);
