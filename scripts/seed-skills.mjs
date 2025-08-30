import sequelize from "../config/database.js";
import Skill from "../models/skills.model.js";

const categoryMap = {
  "JavaScript": "Core Technologies",
  "TypeScript": "Core Technologies",
  "Node.js": "Core Technologies",
  "NestJS": "Core Technologies",
  "PHP": "Core Technologies",
  "Laravel": "Core Technologies",
  "MySQL": "Core Technologies",
  "MongoDB": "Core Technologies",
  "SQL Stored Procedures": "Core Technologies",
  "React": "Core Technologies",
  "Nextjs": "Core Technologies",


  "Angular": "Frontend & UI",
  "TailwindCSS": "Frontend & UI",
  "Bootstrap": "Frontend & UI",
  "HTML5": "Frontend & UI",
  "CSS3": "Frontend & UI",

  "Git": "Tools & Practices",
  "GitHub": "Tools & Practices",
  "Bitbucket": "Tools & Practices",
  "Docker": "Tools & Practices",
  "Postman": "Tools & Practices",
  "Jira": "Tools & Practices",
  "SourceTree": "Tools & Practices",

  "Flutter": "Additional Knowledge",
  "Java": "Additional Knowledge",
  "Livewire": "Additional Knowledge",
  "Python": "Additional Knowledge",
};

const coreSet = new Set([
  "JavaScript", "TypeScript", "Node.js", "NestJS",
  "PHP", "Laravel", "MySQL", "MongoDB", "SQL Stored Procedures", "React", "Nextjs",
]);

// Ajustá niveles 1..5 a tu gusto
const defaultLevels = {
  "JavaScript": 5,
  "TypeScript": 5,
  "Node.js": 5,
  "NestJS": 5,
  "PHP": 5,
  "Laravel": 5,
  "MySQL": 5,
  "MongoDB": 5,
  "SQL Stored Procedures": 5,
  "React": 5,
  "Nextjs": 5,

  "Angular": 5,
  "TailwindCSS": 5,
  "Bootstrap": 5,
  "HTML5": 5,
  "CSS3": 5,

  "Git": 5,
  "GitHub": 5,
  "Bitbucket": 5,
  "Docker": 5,
  "Postman": 5,
  "Jira": 5,

  "Flutter": 3,
  "Java": 3,
  "Livewire": 3,
  "Python": 3
};

// Lista final a poblar (podés agregar/quitar aquí)
const skillsToUpsert = Object.keys(categoryMap);

async function main() {
  await sequelize.authenticate();
  console.log("DB connection OK ✅");

  for (const name of skillsToUpsert) {
    const category = categoryMap[name] ?? "Additional Knowledge";
    const is_core = coreSet.has(name);
    const level = defaultLevels[name] ?? 3;

    const [row, created] = await Skill.findOrCreate({
      where: { skill_name: name },
      defaults: {
        skill_name: name,
        skill_level: level,
        category,
        is_core
      }
    });

    if (!created) {
      // Si ya existía, lo actualizamos (backfill)
      await row.update({ category, is_core, skill_level: level });
      console.log(`Updated: ${name}`);
    } else {
      console.log(`Created: ${name}`);
    }
  }

  console.log("Seed/backfill completo ✅");
  await sequelize.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
