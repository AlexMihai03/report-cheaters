import { Either, Result, left, right } from "../../../../../common/core/Result";
import { Tenant } from "./Tenant";
import { ITenantRepository } from "./TenantRepository";
import { IUserRepository } from "./UserRepository";
import { AppError } from "@common/core/AppError";

type Response = Either<
  AppError.UnexpectedError |
  Result<any>,
  Result<Tenant>
>;

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
    administratorUsername: string,
    emailAddress: string,
  ): Response {
    try {
      const tenantOrError = Tenant.create(
        {
          name: tenantName,
          description: tenantDescription,
          active: true,
          registrationInvitations: new Set(),
        },
        this.tenantRepository.nextIdentity(),
      );

      if (tenantOrError.isFailure) {
        return left(
          Result.fail<Tenant>(tenantOrError.error.toString()),
        ) as Response;
      }

      const tenant = tenantOrError.getValue();

      this.tenantRepository.add(tenant);

      this.registerAdministratorFor(
        tenant,
        administratorUsername,
        emailAddress,
      );

      tenant.publishTenantProvisioned(tenant.id);

      return right(Result.ok<Tenant>(tenant));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  private registerAdministratorFor(
    tenant: Tenant,
    adminUsername: string,
    emailAddress: string,
  ): void {
    const invitation =
      tenant.offerRegistrationInvitation("init")
            .getValue()
            .openEnded();

    const strongPassword =
      DomainRegistry
        .passwordService()
        .generateStrongPassword();

    const adminOrError = tenant.registerUser(
      invitation.invitationId,
      "admin",
      strongPassword,
      adminUsername,
      emailAddress,
    );

    this.userRepository.add(adminOrError.getValue());
  }
}