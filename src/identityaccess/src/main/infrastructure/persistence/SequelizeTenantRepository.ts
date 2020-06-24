import { v4 as uuidv4 } from "uuid";

import { ITenantRepository } from "../../model/identity/TenantRepository";
import { Tenant } from "../../model/identity/Tenant";
import { TenantId } from "../../model/identity/TenantId";
import { TenantMap } from "./TenantMap";

export class SequelizeTenantRepository implements ITenantRepository {
  private models: any;

  // TODO: add types for models
  constructor(models: any) {
    this.models = models;
  }

  public async add(tenant: Tenant): Promise<void> {
    const TenantModel = this.models.Tenant;
    const exists = await this.tenantOfId(tenant.id);

    if (!exists) {
      const rawSequelizeTenant = TenantMap.toPersistence(tenant);
      await TenantModel.create(rawSequelizeTenant);
    }
    return;
  }

  public nextIdentity(): TenantId {
    return new TenantId(uuidv4().toString());
  }

  public remove(tenant: Tenant): Promise<void> {
    const TenantModel = this.models.Tenant;
    return TenantModel.destroy({
      where: {
        id: tenant.id.toString(),
      },
    });
  }

  public async tenantNamed(tenantName: string): Promise<Tenant> {
    const TenantModel = this.models.Tenant;
    const tenant = await TenantModel.findOne({
      where: {
        name: tenantName,
      },
    });

    return TenantMap.toDomain(tenant);
  }

  public async tenantOfId(tenantId: TenantId): Promise<Tenant> {
    const TenantModel = this.models.Tenant;
    const tenant = await TenantModel.findOne({
      where: {
        id: tenantId.toString(),
      },
    });
    if (!!tenant === false) {
      throw new Error("Tenant not found.");
    }
    return TenantMap.toDomain(tenant);
  }
}