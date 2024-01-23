import Skill from "../models/skills.model.js";

export const getSkills = async (req, res) => {
  const skills = await Skill.findAll({
    order: [['createdAt', 'ASC']]
  });
  if (!skills) {
    return res.status(400).json({
      ok: false,
      msg: "No skills yet",
    });
  }
  res.status(200).json({
    ok: true,
    skills,
  });
};


export const getSkill = async (req, res) => {
  const id = req.params.id;
  const skill = await Skill.findOne({
    where: {skill_id: id}
  });
  if (!skill) {
    return res.status(400).json({
      ok: false,
      msg: `This id doesn'n exist ${id}`,
    });
  }
  res.status(200).json({
    ok: true,
    skill,
  });
};

export const createSkill = async (req, res) => {

  const skill = {
    skill_name: req.body.skill_name,
    skill_level: req.body.skill_level,
  }

  const createdSkill = await Skill.create(skill);
  if (!createdSkill) {
    return res.status(500).json({
      ok: false,
      msg: "Create error",
    });
  }
  res.status(201).json({
    ok: true,
    createdSkill
  });
};

export const updateSkill = async (req, res) => {

  const id = req.params.id;

  const skill = {
    skill_name: req.body.skill_name,
    skill_level: req.body.skill_level,
  }

  const updatedSkill = await Skill.update(skill,{
    where: {skill_id: id}
  });
  if (!updatedSkill) {
    return res.status(500).json({
      ok: false,
      msg: "Updated error",
    });
  }
  res.status(201).json({
    ok: true,
    updatedSkill
  });
};
export const deleteSkill = async (req, res) => {

  const id = req.params.id;


  const deletedSkill = await Skill.destroy({
    where: {skill_id: id}
  });
  if (!deletedSkill) {
    return res.status(500).json({
      ok: false,
      msg: "Delete error",
    });
  }
  res.status(201).json({
    ok: true,
    deletedSkill
  });
};