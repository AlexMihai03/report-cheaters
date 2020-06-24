import { TenantId } from "./TenantId";
import { AggregateRoot } from "@common/domain/AggregateRoot";
import { UniqueEntityID } from "@common/domain/UniqueEntityID";

interface IUserProps {
  username: string;
  password: string;
  // person: Person;
  tenantId: TenantId;
}

export class User extends AggregateRoot<IUserProps> {
  protected constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }
}