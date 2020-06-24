import { Tenant } from "./Tenant";
import { TenantId } from "./TenantId";

export interface ITenantRepository {
  add: (tenant: Tenant) => void;
  nextIdentity: () => TenantId;
  remove: (tenant: Tenant) => void;
  tenantNamed: (name: string) => Promise<Tenant>;
  tenantOfId: (tenantId: TenantId) => Promise<Tenant>;
}