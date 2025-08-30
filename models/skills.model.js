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
  },
  category: {
    type: DataTypes.STRING,  
    allowNull: true,          
    validate: {
      isInCategory(value) {
        if (value == null) return; 
        const allowed = [
          "Core Technologies",
          "Frontend & UI",
          "Tools & Practices",
          "Additional Knowledge"
        ];
        if (!allowed.includes(value)) {
          throw new Error(`Invalid category: ${value}`);
        }
      }
    }
  },
  is_core: {
    type: DataTypes.BOOLEAN,
    allowNull: true,   
    defaultValue: false
  }
}, {
  sequelize,
  modelName: "Skill",
  tableName: "Skills" 
});

export default Skill;