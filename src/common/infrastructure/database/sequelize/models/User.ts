import {
  Model,
  Association,
  Sequelize,
  DataTypes,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from "sequelize/types";
import TenantModel from "./Tenant";

class UserModel extends Model {
  public username!: string;
  public password!: string;

  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Tenant association methods
  public getTenant!: BelongsToGetAssociationMixin<TenantModel>;
  public setTenant!: BelongsToSetAssociationMixin<TenantModel, string>;

  // Populate for inclusions
  public readonly Tenant?: TenantModel;

  public static associations: {
    Tenant: Association<UserModel, TenantModel>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init({
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
    });
  }
}

export default UserModel;