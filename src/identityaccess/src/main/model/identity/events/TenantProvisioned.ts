import { IDomainEvent } from "@common/domain/events/IDomainEvent";
import { TenantId } from "../TenantId";
import { UniqueEntityID } from "@common/domain/UniqueEntityID";

export class TenantProvisioned implements IDomainEvent {
  public dateTimeOccurrend: Date;
  public tenantId: TenantId;

  constructor(tenantId: TenantId) {
    this.dateTimeOccurrend = new Date();
    this.tenantId = tenantId;
  }

  getAggregateId(): UniqueEntityID {
    return this.tenantId;
  }
}