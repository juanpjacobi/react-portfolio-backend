import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Skill extends Model {}

Skill.init({
  skill_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  skill_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skill_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Skill'
});

export default Skill;
