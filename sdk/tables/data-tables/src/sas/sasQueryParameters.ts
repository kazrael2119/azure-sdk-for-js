// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SasIPRange } from "./sasIPRange.js";
import { ipRangeToString } from "./sasIPRange.js";
import type { UserDelegationKey } from "./models.js";
import { truncatedISO8061Date } from "../utils/truncateISO8061Date.js";

/**
 * Protocols for generated SAS.
 */
export type SasProtocol = "https" | "https,http";

/**
 * Represents the components that make up an Azure SAS' query parameters. This type is not constructed directly
 * by the user; it is only generated by the {@link AccountSasSignatureValues} and {@link TableSasSignatureValues}
 * types. Once generated, it can be encoded into a `string` and appended to a URL directly (though caution should
 * be taken here in case there are existing query parameters, which might affect the appropriate means of appending
 * these query parameters).
 *
 * NOTE: Instances of this class are immutable.
 */
export class SasQueryParameters {
  /**
   * The Tables API version.
   */
  public readonly version: string;

  /**
   * Optional. Table name to generate the SAS for
   */
  public readonly tableName?: string;

  /**
   * Optional. The allowed HTTP protocol(s).
   */
  public readonly protocol?: SasProtocol;

  /**
   * Optional. The start time for this SAS token.
   */
  public readonly startsOn?: Date;

  /**
   * Optional only when identifier is provided. The expiry time for this SAS token.
   */
  public readonly expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to {@link AccountSasPermissions}, or {@link TableSasPermissions} for
   * more details.
   */
  public readonly permissions?: string;

  /**
   * Optional. The table services being accessed (only for Account SAS). Please refer to {@link AccountSasServices}
   * for more details.
   */
  public readonly services?: string;

  /**
   * Optional. The table resource types being accessed (only for Account SAS). Please refer to
   * {@link AccountSasResourceTypes} for more details.
   */
  public readonly resourceTypes?: string;

  /**
   * Optional. The signed identifier (only for {@link TableSasSignatureValues}).
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/establishing-a-stored-access-policy
   */
  public readonly identifier?: string;

  /**
   * The signature for the SAS token.
   */
  public readonly signature: string;

  /**
   * Inner value of getter ipRange.
   */
  private readonly ipRangeInner?: SasIPRange;

  /**
   * The Azure Active Directory object ID in GUID format.
   * Property of user delegation key.
   */
  private readonly signedOid?: string;

  /**
   * The Azure Active Directory tenant ID in GUID format.
   * Property of user delegation key.
   */
  private readonly signedTenantId?: string;

  /**
   * The date-time the key is active.
   * Property of user delegation key.
   */
  private readonly signedStartsOn?: Date;

  /**
   * The date-time the key expires.
   * Property of user delegation key.
   */
  private readonly signedExpiresOn?: Date;

  /**
   * Abbreviation of the Azure Table service that accepts the user delegation key.
   * Property of user delegation key.
   */
  private readonly signedService?: string;

  /**
   * The service version that created the user delegation key.
   * Property of user delegation key.
   */
  private readonly signedVersion?: string;

  /**
   * Authorized AAD Object ID in GUID format. The AAD Object ID of a user authorized by the owner of the User Delegation Key
   * to perform the action granted by the SAS. The Azure Table service will ensure that the owner of the user delegation key
   * has the required permissions before granting access but no additional permission check for the user specified in
   * this value will be performed. This is only used for User Delegation SAS.
   */
  public readonly preauthorizedAgentObjectId?: string;

  /**
   * A GUID value that will be logged in the table diagnostic logs and can be used to correlate SAS generation with table resource access.
   * This is only used for User Delegation SAS.
   */
  public readonly correlationId?: string;

  /**
   * Optional, but startPartitionKey must accompany startRowKey. The minimum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no lower bound on the table entities that can be accessed.
   */
  public readonly startPartitionKey?: string;

  /**
   * Optional, but startPartitionKey must accompany startRowKey. The minimum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no lower bound on the table entities that can be accessed.
   */
  public readonly startRowKey?: string;

  /**
   * Optional, but endPartitionKey must accompany endRowKey. The maximum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no upper bound on the table entities that can be accessed.
   */
  public readonly endPartitionKey?: string;

  /**
   * Optional, but endPartitionKey must accompany endRowKey. The maximum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no upper bound on the table entities that can be accessed.
   */
  public readonly endRowKey?: string;

  /**
   * Optional. IP range allowed for this SAS.
   *
   * @readonly
   */
  public get ipRange(): SasIPRange | undefined {
    if (this.ipRangeInner) {
      return {
        end: this.ipRangeInner.end,
        start: this.ipRangeInner.start,
      };
    }
    return undefined;
  }

  /**
   * Creates an instance of SASQueryParameters.
   *
   * @param version - Representing the table service version
   * @param signature - Representing the signature for the SAS token
   * @param options - Optional. Options to construct the SASQueryParameters.
   */
  constructor(version: string, signature: string, options: SasQueryParametersOptions = {}) {
    this.version = version;
    this.signature = signature;

    this.permissions = options.permissions;
    this.services = options.services;
    this.resourceTypes = options.resourceTypes;
    this.protocol = options.protocol;
    this.startsOn = options.startsOn;
    this.expiresOn = options.expiresOn;
    this.ipRangeInner = options.ipRange;
    this.identifier = options.identifier;
    this.tableName = options.tableName;
    this.endPartitionKey = options.endPartitionKey;
    this.endRowKey = options.endRowKey;
    this.startPartitionKey = options.startPartitionKey;
    this.startRowKey = options.startRowKey;

    if (options.userDelegationKey) {
      this.signedOid = options.userDelegationKey.signedObjectId;
      this.signedTenantId = options.userDelegationKey.signedTenantId;
      this.signedStartsOn = options.userDelegationKey.signedStartsOn;
      this.signedExpiresOn = options.userDelegationKey.signedExpiresOn;
      this.signedService = options.userDelegationKey.signedService;
      this.signedVersion = options.userDelegationKey.signedVersion;

      this.preauthorizedAgentObjectId = options.preauthorizedAgentObjectId;
      this.correlationId = options.correlationId;
    }
  }

  /**
   * Encodes all SAS query parameters into a string that can be appended to a URL.
   *
   */
  public toString(): string {
    const params: string[] = [
      "sv", // SignedVersion
      "ss", // SignedServices
      "srt", // SignedResourceTypes
      "spr", // SignedProtocol
      "st", // SignedStart
      "se", // SignedExpiry
      "sip", // SignedIP
      "si", // SignedIdentifier
      "skoid", // Signed object ID
      "sktid", // Signed tenant ID
      "skt", // Signed key start time
      "ske", // Signed key expiry time
      "sks", // Signed key service
      "skv", // Signed key version
      "sr", // signedResource
      "sp", // SignedPermission
      "sig", // Signature
      "rscc", // Cache-Control
      "rscd", // Content-Disposition
      "rsce", // Content-Encoding
      "rscl", // Content-Language
      "rsct", // Content-Type
      "saoid", // signedAuthorizedObjectId
      "scid", // signedCorrelationId
      "tn", // TableName,
      "srk", // StartRowKey
      "spk", // StartPartitionKey
      "epk", // EndPartitionKey
      "erk", // EndRowKey
    ];
    const queries: string[] = [];

    for (const param of params) {
      switch (param) {
        case "sv":
          this.tryAppendQueryParameter(queries, param, this.version);
          break;
        case "ss":
          this.tryAppendQueryParameter(queries, param, this.services);
          break;
        case "srt":
          this.tryAppendQueryParameter(queries, param, this.resourceTypes);
          break;
        case "spr":
          this.tryAppendQueryParameter(queries, param, this.protocol);
          break;
        case "st":
          this.tryAppendQueryParameter(
            queries,
            param,
            this.startsOn ? truncatedISO8061Date(this.startsOn, false) : undefined,
          );
          break;
        case "se":
          this.tryAppendQueryParameter(
            queries,
            param,
            this.expiresOn ? truncatedISO8061Date(this.expiresOn, false) : undefined,
          );
          break;
        case "sip":
          this.tryAppendQueryParameter(
            queries,
            param,
            this.ipRange ? ipRangeToString(this.ipRange) : undefined,
          );
          break;
        case "si":
          this.tryAppendQueryParameter(queries, param, this.identifier);
          break;
        case "skoid": // Signed object ID
          this.tryAppendQueryParameter(queries, param, this.signedOid);
          break;
        case "sktid": // Signed tenant ID
          this.tryAppendQueryParameter(queries, param, this.signedTenantId);
          break;
        case "skt": // Signed key start time
          this.tryAppendQueryParameter(
            queries,
            param,
            this.signedStartsOn ? truncatedISO8061Date(this.signedStartsOn, false) : undefined,
          );
          break;
        case "ske": // Signed key expiry time
          this.tryAppendQueryParameter(
            queries,
            param,
            this.signedExpiresOn ? truncatedISO8061Date(this.signedExpiresOn, false) : undefined,
          );
          break;
        case "sks": // Signed key service
          this.tryAppendQueryParameter(queries, param, this.signedService);
          break;
        case "skv": // Signed key version
          this.tryAppendQueryParameter(queries, param, this.signedVersion);
          break;
        case "sp":
          this.tryAppendQueryParameter(queries, param, this.permissions);
          break;
        case "sig":
          this.tryAppendQueryParameter(queries, param, this.signature);
          break;
        case "saoid":
          this.tryAppendQueryParameter(queries, param, this.preauthorizedAgentObjectId);
          break;
        case "scid":
          this.tryAppendQueryParameter(queries, param, this.correlationId);
          break;
        case "tn":
          this.tryAppendQueryParameter(queries, param, this.tableName);
          break;
        case "spk":
          this.tryAppendQueryParameter(queries, param, this.startPartitionKey);
          break;
        case "srk":
          this.tryAppendQueryParameter(queries, param, this.startRowKey);
          break;
        case "epk":
          this.tryAppendQueryParameter(queries, param, this.endPartitionKey);
          break;
        case "erk":
          this.tryAppendQueryParameter(queries, param, this.endRowKey);
          break;
      }
    }
    return queries.join("&");
  }

  /**
   * A private helper method used to filter and append query key/value pairs into an array.
   *
   * @param queries -
   * @param key -
   * @param value -
   */
  private tryAppendQueryParameter(queries: string[], key: string, value?: string): void {
    if (!value) {
      return;
    }

    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    if (key.length > 0 && value.length > 0) {
      queries.push(`${key}=${value}`);
    }
  }
}

/**
 * Options to construct {@link SasQueryParameters}.
 */
export interface SasQueryParametersOptions {
  /**
   * Optional only when identifier is provided.
   * Please refer to {@link AccountSasPermissions}, or {@link TableSasPermissions} for
   * more details.
   */
  permissions?: string;
  /**
   * Optional. Table name to generate the SAS for
   */
  tableName?: string;
  /**
   * Optional. The storage services being accessed (only for Account SAS). Please refer to {@link AccountSasServices}
   * for more details.
   */
  services?: string;
  /**
   * Optional. The storage resource types being accessed (only for Account SAS). Please refer to
   * {@link AccountSasResourceTypes} for more details.
   */
  resourceTypes?: string;
  /**
   * Optional. The allowed HTTP protocol(s).
   */
  protocol?: SasProtocol;
  /**
   * Optional. The start time for this SAS token.
   */
  startsOn?: Date;
  /**
   * Optional only when identifier is provided. The expiry time for this SAS token.
   */
  expiresOn?: Date;
  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;
  /**
   * Optional. The signed identifier for access policy
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;
  /**
   * Optional. Specifies which resources are accessible via the SAS (only for {@link AccountSasSignatureValues}).
   * @see https://learn.microsoft.com/rest/api/storageservices/create-service-sas#specifying-the-signed-resource-blob-service-only
   */
  resource?: string;
  /**
   * User delegation key properties.
   */
  userDelegationKey?: UserDelegationKey;
  /**
   * Authorized AAD Object ID in GUID format. The AAD Object ID of a user authorized by the owner of the User Delegation Key
   * to perform the action granted by the SAS. The Azure Table service will ensure that the owner of the user delegation key
   * has the required permissions before granting access but no additional permission check for the user specified in
   * this value will be performed. This cannot be used in conjuction with {@link signedUnauthorizedUserObjectId}.
   * This is only used for User Delegation SAS.
   */
  preauthorizedAgentObjectId?: string;
  /**
   * A GUID value that will be logged in the storage diagnostic logs and can be used to correlate SAS generation with storage resource access.
   * This is only used for User Delegation SAS.
   */
  correlationId?: string;

  /**
   * Optional, but startPartitionKey must accompany startRowKey. The minimum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no lower bound on the table entities that can be accessed.
   */
  startPartitionKey?: string;

  /**
   * Optional, but startPartitionKey must accompany startRowKey. The minimum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no lower bound on the table entities that can be accessed.
   */
  startRowKey?: string;

  /**
   * Optional, but endPartitionKey must accompany endRowKey. The maximum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no upper bound on the table entities that can be accessed.
   */
  endPartitionKey?: string;

  /**
   * Optional, but endPartitionKey must accompany endRowKey. The maximum partition and row keys that are accessible with this shared access signature.
   * Key values are inclusive. If they're omitted, there's no upper bound on the table entities that can be accessed.
   */
  endRowKey?: string;
}
