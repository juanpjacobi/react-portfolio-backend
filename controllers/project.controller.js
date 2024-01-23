import Link from "../models/links.model.js";
import Project from "../models/projects.model.js";
import Image from "../models/images.model.js";


export const getProjects = async (req, res) => {
  const projects = await Project.findAll({
    order: [['createdAt', 'ASC']],
    include: [Link, Image],
  });
  if (!projects) {
    return res.status(400).json({
      ok: false,
      msg: "No projects yet",
    });
  }
  res.status(200).json({
    ok: true,
    projects,
  });
};

export const getProject = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({
    where: {project_id: id}
  });
  if (!project) {
    return res.status(400).json({
      ok: false,
      msg: `This id doesn'n exist ${id}`,
    });
  }
  res.status(200).json({
    ok: true,
    project,
  });
};

export const createProject = async (req, res) => {

  const project = {
    project_name: req.body.project_name,
    project_description: req.body.project_description,
  }

  const createdProject = await Project.create(project);
  if (!createdProject) {
    return res.status(500).json({
      ok: false,
      msg: "Create error",
    });
  }
  res.status(201).json({
    ok: true,
    createdProject
  });
};

export const updateProject = async (req, res) => {
  const id = req.params.id;

  const project = {
    project_name: req.body.project_name,
    project_description: req.body.project_description,
  }

  const updatedProject = await Project.update(project, {
    where: { project_id: id},
  });
  if (!updatedProject) {
    return res.status(500).json({
      ok: false,
      msg: "Update error",
    });
  }
  res.status(201).json({
    ok: true,
    updatedProject
  });
};

export const deleteProject = async (req, res) => {

  const id = req.params.id;


  const deletedProject = await Project.destroy({
    where: {project_id: id}
  });
  if (!deletedProject) {
    return res.status(500).json({
      ok: false,
      msg: "Delete error",
    });
  }
  res.status(201).json({
    ok: true,
    deletedProject
  });
};