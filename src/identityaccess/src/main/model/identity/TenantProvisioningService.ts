import { Either } from "../../../../../common/core/Result";
import { Tenant } from "./Tenant";
import { ITenantRepository } from "./TenantRepository";
import { IUserRepository } from "./UserRepository";

export class TenantProvisioningService {
  private tenantRepository: ITenantRepository;
  private userRepository: IUserRepository;

  constructor(tenantRepository: ITenantRepository, userRepository: IUserRepository) {
    this.tenantRepository = tenantRepository;
    this.userRepository = userRepository;
  }

  public provisionTenant(
    tenantName: string,
    tenantDescription: string,
  ) {

  }

  private registerAdministratorFor(
    tenant: Tenant,
    // administratorName: FullName,
  ): void {

  }
}