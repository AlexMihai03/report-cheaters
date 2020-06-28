import { v4 as uuidv4 } from "uuid";

import { AggregateRoot } from "../../../../../common/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../../common/domain/UniqueEntityID";
import { Result } from "../../../../../common/core/Result";
import { Guard } from "../../../../../common/core/Guard";
import { TenantActivated } from "./events/TenantActivated";
import { TenantDeactivated } from "./events/TenantDeactivated";
import { TenantId } from "./TenantId";
import { TenantProvisioned } from "./events/TenantProvisioned";
import { RegistrationInvitation } from "./RegistrationInvitation";

interface TenantProps {
  name: string;
  description: string;
  active: boolean;
  registrationInvitations: Set<RegistrationInvitation>;
}

export class Tenant extends AggregateRoot<TenantProps> {

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  protected registrationInvitations(): Set<RegistrationInvitation> {
    return this.props.registrationInvitations;
  }

  private constructor(props: TenantProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TenantProps, id?: UniqueEntityID): Result<Tenant> {
    const nameAtLeastGuard = Guard.againstAtLeast(5, props.name);
    if (!nameAtLeastGuard.succeeded) {
      return Result.fail<Tenant>(`Tenant Name: ${nameAtLeastGuard.message}`);
    }
    const nameAtMostGuard = Guard.againstAtMost(100, props.name);
    if (!nameAtMostGuard.succeeded) {
      return Result.fail<Tenant>(`Tenant Name: ${nameAtMostGuard.message}`);
    }
    const descriptionAtLeastGuard = Guard.againstAtLeast(5, props.description);
    if (!descriptionAtLeastGuard.succeeded) {
      return Result.fail<Tenant>(`Tenant Name: ${descriptionAtLeastGuard.message}`);
    }
    const descriptionAtMostGuard = Guard.againstAtMost(100, props.description);
    if (!descriptionAtMostGuard.succeeded) {
      return Result.fail<Tenant>(`Tenant Name: ${descriptionAtMostGuard.message}`);
    }

    const tenant = new Tenant(props, id);

    return Result.ok<Tenant>(tenant);
  }

  public offerRegistrationInvitation(description: string): Result<RegistrationInvitation> {
    if (!this.isActive()) {
      return Result.fail<RegistrationInvitation>("Tenant is not active.");
    }
    // TODO: check if invitation already exists

    const invitationOrError = RegistrationInvitation.create({
      description,
      tenantId: new TenantId(this.id.toString()),
      invitationId: uuidv4().toString().toUpperCase(),
    });

    if (!invitationOrError.isSuccess) {
      return Result.fail<RegistrationInvitation>(invitationOrError.error.toString());
    }

    const invitation = invitationOrError.getValue();

    this.registrationInvitations().add(invitation);

    return Result.ok<RegistrationInvitation>(invitation);
  }

  public activate() {
    if (!this.isActive()) {
      this.setActive(true);

      this.addDomainEvent(new TenantActivated(this.id));
    }
  }

  public deactivate() {
    if (this.isActive) {
      this.setActive(false);

      this.addDomainEvent(new TenantDeactivated(this.id));
    }
  }

  public isActive(): boolean {
    return this.props.active;
  }

  protected setActive(anActive: boolean): void {
    this.props.active = anActive;
  }

  public publishTenantProvisioned(tenantId: TenantId) {
    this.addDomainEvent(new TenantProvisioned(tenantId));
  }
}