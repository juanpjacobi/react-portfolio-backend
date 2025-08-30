import Link from "../models/links.model.js";
import Project from "../models/projects.model.js";
import Image from "../models/images.model.js";

// helpers simples
const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "ASC"]],
      include: [Link, Image],
    });

    if (!projects || projects.length === 0) {
      return res.status(200).json({ ok: true, projects: [] });
    }

    res.status(200).json({ ok: true, projects });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const project = await Project.findOne({ where: { project_id: id } });
    if (!project) {
      return res.status(404).json({ ok: false, msg: `Project not found: ${id}` });
    }

    res.status(200).json({ ok: true, project });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { project_name, project_description, project_information } = req.body;

    // Validaciones mínimas
    if (!isNonEmptyString(project_name) || !isNonEmptyString(project_description)) {
      return res.status(400).json({
        ok: false,
        msg: "project_name and project_description are required",
      });
    }

    const project = {
      project_name: project_name.trim(),
      project_description: project_description.trim(),
      project_information: isNonEmptyString(project_information)
        ? project_information.trim()
        : project_information ?? null,
    };

    const createdProject = await Project.create(project);
    if (!createdProject) {
      return res.status(500).json({ ok: false, msg: "Create error" });
    }

    res.status(201).json({ ok: true, createdProject });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const { project_name, project_description, project_information } = req.body;

    // Al menos un campo
    if (
      typeof project_name === "undefined" &&
      typeof project_description === "undefined" &&
      typeof project_information === "undefined"
    ) {
      return res.status(400).json({
        ok: false,
        msg: "At least one field is required to update",
      });
    }

    const row = await Project.findOne({ where: { project_id: id } });
    if (!row) {
      return res.status(404).json({ ok: false, msg: `Project not found: ${id}` });
    }

    const payload = {};
    if (typeof project_name !== "undefined") {
      if (!isNonEmptyString(project_name)) {
        return res.status(400).json({ ok: false, msg: "project_name must be a non-empty string" });
      }
      payload.project_name = project_name.trim();
    }
    if (typeof project_description !== "undefined") {
      if (!isNonEmptyString(project_description)) {
        return res
          .status(400)
          .json({ ok: false, msg: "project_description must be a non-empty string" });
      }
      payload.project_description = project_description.trim();
    }
    if (typeof project_information !== "undefined") {
      payload.project_information = isNonEmptyString(project_information)
        ? project_information.trim()
        : project_information; 
    }

    await row.update(payload);


    res.status(200).json({ ok: true, updatedProject: row });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const deleted = await Project.destroy({ where: { project_id: id } });
    if (!deleted) {
      return res.status(404).json({ ok: false, msg: `Project not found: ${id}` });
    }

    res.status(200).json({ ok: true, deletedProject: id });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
