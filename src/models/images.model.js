import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Project from "./projects.model.js";

class Image extends Model {}

Image.init({
  image_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_alt: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
    sequelize,
    modelName: 'Image'
});
Image.belongsTo(Project, {
  foreignKey: 'project_id'
})
Project.hasMany(Image, {
  foreignKey: 'project_id'
})


export default Image;
