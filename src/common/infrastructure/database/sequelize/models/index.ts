import { connection } from "../config";
import TenantModel from "./Tenant";
import UserModel from "./User";

const models = {
  Tenant: TenantModel,
  User: UserModel,
};

Object.keys(models).forEach((key: keyof typeof models) => {
  models[key].initialize(connection);
});

// One tenant for each user
models.User.belongsTo(models.Tenant);
// One tenant has many users
models.Tenant.hasMany(models.User);

export default models;