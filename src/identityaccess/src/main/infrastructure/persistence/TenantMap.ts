import { Tenant } from "../../model/identity/Tenant";
import { UniqueEntityID } from "@common/domain/UniqueEntityID";
import { Mapper } from "@common/infrastructure/Mapper";

export class TenantMap implements Mapper<Tenant> {

  public static toDomain(raw: any): Tenant {
    const tenantOrError = Tenant.create({
      name: raw.name,
      description: raw.description,
      active: raw.active,
      registrationInvitations: new Set(),
    }, new UniqueEntityID(raw.id));

    tenantOrError.isFailure ? console.log(tenantOrError.error) : "";

    return tenantOrError.isSuccess ? tenantOrError.getValue() : null;
  }

  // TODO: add type for return from database models
  public static toPersistence(tenant: Tenant): any {
    return {
      id: tenant.id.toString(),
      name: tenant.name,
      description: tenant.description,
      active: tenant.isActive(),
    };
  }
}