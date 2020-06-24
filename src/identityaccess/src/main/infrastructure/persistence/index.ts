import { SequelizeTenantRepository } from "./SequelizeTenantRepository";
import models from "@common/infrastructure/database/sequelize/models";

const tenantRepository = new SequelizeTenantRepository(models);

export {
  tenantRepository,
};