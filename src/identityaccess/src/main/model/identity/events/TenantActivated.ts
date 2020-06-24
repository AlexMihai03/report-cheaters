import { IDomainEvent } from "../../../../../../common/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../../../common/domain/UniqueEntityID";
import { TenantId } from "../TenantId";

export class TenantActivated implements IDomainEvent {
  public dateTimeOccurrend: Date;
  public tenantId: TenantId;

  constructor(aTenantId: TenantId) {
    this.dateTimeOccurrend = new Date();
    this.tenantId = aTenantId;
  }

  getAggregateId(): UniqueEntityID {
    return this.tenantId;
  }
}