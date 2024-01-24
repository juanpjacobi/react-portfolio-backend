import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

import dotenv from "dotenv"
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME, 
  process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
    dialectModule: mysql2
  });

  export default sequelize;