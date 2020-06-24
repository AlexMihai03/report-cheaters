import { UniqueEntityID } from "../../../../../common/domain/UniqueEntityID";

export class TenantId extends UniqueEntityID {
  constructor(id: string) {
    super(id);
  }
}