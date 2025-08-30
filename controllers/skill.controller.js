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
  "Livewire": "Additional Knowledge"
};

const coreSet = new Set([
  "JavaScript", "TypeScript", "Node.js", "NestJS",
  "PHP", "Laravel", "MySQL", "MongoDB", "SQL Stored Procedures"
]);

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      order: [
        ["is_core", "DESC"],
        ["skill_level", "DESC"],
        ["skill_name", "ASC"]
      ]
    });
    if (!skills || skills.length === 0) {
      return res.status(200).json({ ok: true, skills: [] });
    }
    res.status(200).json({ ok: true, skills });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const getSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const skill = await Skill.findOne({ where: { skill_id: id } });
    if (!skill) {
      return res.status(404).json({ ok: false, msg: `Skill not found: ${id}` });
    }
    res.status(200).json({ ok: true, skill });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { skill_name, skill_level, category, is_core } = req.body;

    if (!skill_name || !skill_level) {
      return res.status(400).json({ ok: false, msg: "skill_name and skill_level are required" });
    }
    if (skill_level < 1 || skill_level > 5) {
      return res.status(400).json({ ok: false, msg: "skill_level must be between 1 and 5" });
    }

    const inferredCategory = category ?? categoryMap[skill_name] ?? "Additional Knowledge";
    const inferredIsCore = typeof is_core === "boolean" ? is_core : coreSet.has(skill_name);

    const createdSkill = await Skill.create({
      skill_name,
      skill_level,
      category: inferredCategory,
      is_core: inferredIsCore
    });

    res.status(201).json({ ok: true, createdSkill });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const { skill_name, skill_level, category, is_core } = req.body;

    const skill = await Skill.findOne({ where: { skill_id: id } });
    if (!skill) {
      return res.status(404).json({ ok: false, msg: `Skill not found: ${id}` });
    }

    const payload = {};
    if (skill_name) payload.skill_name = skill_name;
    if (typeof skill_level !== "undefined") {
      if (skill_level < 1 || skill_level > 5) {
        return res.status(400).json({ ok: false, msg: "skill_level must be between 1 and 5" });
      }
      payload.skill_level = skill_level;
    }

    const nameForInference = payload.skill_name ?? skill.skill_name;
    payload.category = (typeof category !== "undefined")
      ? category
      : (categoryMap[nameForInference] ?? skill.category ?? "Additional Knowledge");

    payload.is_core = (typeof is_core !== "undefined")
      ? !!is_core
      : (coreSet.has(nameForInference));

    await skill.update(payload);

    res.status(200).json({ ok: true, updatedSkill: skill });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Skill.destroy({ where: { skill_id: id } });
    if (!deleted) {
      return res.status(404).json({ ok: false, msg: `Skill not found: ${id}` });
    }
    res.status(200).json({ ok: true, deletedSkill: id });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
