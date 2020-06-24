import {
  Model,
  Association,
  Sequelize,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize/types";
import UserModel from "./User";

class TenantModel extends Model {
  public name!: string;
  public description!: string;
  public active!: boolean;

  // Auto-generated
  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // User association methods
  public addUser!: HasManyAddAssociationMixin<UserModel, string>;
  public addUsers!: HasManyAddAssociationsMixin<UserModel, string>;
  public createUser!: HasManyCreateAssociationMixin<UserModel>;
  public getUsers!: HasManyGetAssociationsMixin<UserModel>;
  public removeUser!: HasManyRemoveAssociationMixin<UserModel, string>;

  // populated for inclusions
  public readonly users?: UserModel[];

  public static associations: {
    classes: Association<TenantModel, UserModel>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    }, {
      sequelize,
    });
  }
}

export default TenantModel;