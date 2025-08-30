// scripts/backfill-skill-categories.js
import { Op } from "sequelize";
import Skill from "../models/Skill.js"; // tu modelo

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

  "React": "Frontend & UI",
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

  "Flutter": "Additional Knowledge",
  "Java": "Additional Knowledge",
  "Livewire": "Additional Knowledge",
};

const coreSet = new Set([
  "JavaScript", "TypeScript", "Node.js", "NestJS",
  "PHP", "Laravel", "MySQL", "MongoDB", "SQL Stored Procedures"
]);

async function main() {
  const rows = await Skill.findAll();
  for (const s of rows) {
    const category = categoryMap[s.skill_name] ?? "Additional Knowledge";
    const is_core = coreSet.has(s.skill_name);
    await s.update({ category, is_core });
  }
  console.log("Backfill completo ✅");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
