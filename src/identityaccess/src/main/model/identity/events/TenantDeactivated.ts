import { IDomainEvent } from "../../../../../../common/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../../../common/domain/UniqueEntityID";
import { TenantId } from "../TenantId";

export class TenantDeactivated implements IDomainEvent {
  public dateTimeOccurrend: Date;
  public tenantId: TenantId;

  constructor(atenantId: TenantId) {
    this.dateTimeOccurrend = new Date();
    this.tenantId = atenantId;
  }

  getAggregateId(): UniqueEntityID {
    return this.tenantId;
  }
}