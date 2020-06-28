import { TenantId } from "./TenantId";
import { Entity } from "@common/domain/Entity";
import { UniqueEntityID } from "@common/domain/UniqueEntityID";
import { Result } from "@common/core/Result";
import { Guard } from "@common/core/Guard";

interface IRegInvProps {
  description: string;
  invitationId: string;
  startingOn?: Date | null;
  until?: Date | null;
  tenantId: TenantId;
}

export class RegistrationInvitation extends Entity<IRegInvProps> {

  get description(): string {
    return this.props.description;
  }

  get invitationId(): string {
    return this.props.invitationId;
  }

  get startingOn(): Date | null {
    return this.props.startingOn;
  }

  get until(): Date | null {
    return this.props.until;
  }

  public isAvailable(): boolean {
    if (!this.startingOn && !this.until) {
      return true;
    }
    const time = new Date().getTime();

    if (time >= this.startingOn.getTime() && time <= this.until.getTime()) {
      return true;
    }
    return false;
  }

  public openEnded(): RegistrationInvitation {
    this.props.startingOn = null;
    this.props.until = null;
    return this;
  }

  private constructor(props: IRegInvProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IRegInvProps, id?: UniqueEntityID): Result<RegistrationInvitation> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.description, argumentName: "description" },
      { argument: props.invitationId, argumentName: "invitationId" },
      { argument: props.tenantId.toString(), argumentName: "tenantId" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<RegistrationInvitation>(guardResult.message);
    }

    if (props.startingOn > props.until) {
      return Result.fail<RegistrationInvitation>("The starting date and time must be before the until date and time.");
    }

    const isNewInvitation = !!id === false;
    const invitation = new RegistrationInvitation(props, id);

    if (isNewInvitation) {
      // invitation.addDomainEvent(new RegistrationInvitationCreated(invitation));
    }

    return Result.ok<RegistrationInvitation>(invitation);
  }

  public setStartingOn(date: Date): RegistrationInvitation {
    if (this.until !== null) {
      throw new Error("Cannot set starting-on date after until date.");
    }

    this.props.startingOn = date;

    this.props.until = new Date(date.getTime() + 86400000);

    return this;
  }

  public setUntil(date: Date): RegistrationInvitation {
    if (this.startingOn === null) {
      throw new Error("Cannot set until date before setting starting-on date.");
    }
    this.props.until = date;

    this.setUntil(date);

    return this;
  }
}