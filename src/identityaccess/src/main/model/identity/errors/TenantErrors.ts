import { Result } from "@common/core/Result";
import { UseCaseError } from "@common/core/UseCaseError";

export namespace TenantErrors {

  export class CreateTenantError extends Result<UseCaseError> {
    constructor(message: string) {
      super(false, {
        message: `Tenant cannot be created.`,
      });
    }
  }
}