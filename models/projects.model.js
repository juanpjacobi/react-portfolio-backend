import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Link from "./links.model.js";

class Project extends Model {}

Project.init({
  project_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  project_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  project_information: {
    type: DataTypes.TEXT,
    allowNull: true,    
  }
}, {
    sequelize,
    modelName: 'Project'
});
// Project.hasOne(Link, {
//   foreignKey: 'project_id'
// })

export default Project;
