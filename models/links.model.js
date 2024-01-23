import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Project from "./projects.model.js";

class Link extends Model {}

Link.init({
  link_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  link_visit_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link_code_url: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
    sequelize,
    modelName: 'Link'
});
Link.belongsTo(Project, {
  foreignKey: 'project_id'
})
Project.hasOne(Link, {
  foreignKey: 'project_id'
})
export default Link;
