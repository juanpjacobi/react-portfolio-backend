import Link from "../models/links.model.js";
import Project from "../models/projects.model.js";

// helpers
const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isURL = (v) => {
  if (!isNonEmptyString(v)) return false;
  try { new URL(v); return true; } catch { return false; }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.findAll({
      order: [["createdAt", "ASC"]],
      include: Project
    });

    if (!links || links.length === 0) {
      return res.status(200).json({ ok: true, links: [] });
    }
    res.status(200).json({ ok: true, links });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const getLink = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const link = await Link.findOne({
      where: { link_id: id },
      include: Project
    });

    if (!link) {
      return res.status(404).json({ ok: false, msg: `Link not found: ${id}` });
    }
    res.status(200).json({ ok: true, link });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const createLink = async (req, res) => {
  try {
    const { project_id, link_visit_url, link_code_url } = req.body;

    if (!isNonEmptyString(project_id)) {
      return res.status(400).json({ ok: false, msg: "project_id is required" });
    }
    if (!isNonEmptyString(link_visit_url) && !isNonEmptyString(link_code_url)) {
      return res.status(400).json({
        ok: false,
        msg: "At least one URL is required: link_visit_url or link_code_url"
      });
    }
    if (isNonEmptyString(link_visit_url) && !isURL(link_visit_url)) {
      return res.status(400).json({ ok: false, msg: "link_visit_url must be a valid URL" });
    }
    if (isNonEmptyString(link_code_url) && !isURL(link_code_url)) {
      return res.status(400).json({ ok: false, msg: "link_code_url must be a valid URL" });
    }

    const project = await Project.findOne({ where: { project_id } });
    if (!project) {
      return res.status(400).json({ ok: false, msg: `Project not found: ${project_id}` });
    }

    const link = {
      project_id,
      link_visit_url: isNonEmptyString(link_visit_url) ? link_visit_url.trim() : null,
      link_code_url: isNonEmptyString(link_code_url) ? link_code_url.trim() : null,
    };

    const createdLink = await Link.create(link);
    if (!createdLink) {
      return res.status(500).json({ ok: false, msg: "Create error" });
    }
    res.status(201).json({ ok: true, createdLink });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const updateLink = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const { project_id, link_visit_url, link_code_url } = req.body;

    if (
      typeof project_id === "undefined" &&
      typeof link_visit_url === "undefined" &&
      typeof link_code_url === "undefined"
    ) {
      return res.status(400).json({ ok: false, msg: "At least one field is required to update" });
    }

    const row = await Link.findOne({ where: { link_id: id } });
    if (!row) {
      return res.status(404).json({ ok: false, msg: `Link not found: ${id}` });
    }

    const payload = {};
    if (typeof project_id !== "undefined") {
      if (!isNonEmptyString(project_id)) {
        return res.status(400).json({ ok: false, msg: "project_id must be a non-empty string" });
      }
      // validar que exista el proyecto asignado
      const project = await Project.findOne({ where: { project_id } });
      if (!project) {
        return res.status(400).json({ ok: false, msg: `Project not found: ${project_id}` });
      }
      payload.project_id = project_id;
    }

    if (typeof link_visit_url !== "undefined") {
      if (isNonEmptyString(link_visit_url) && !isURL(link_visit_url)) {
        return res.status(400).json({ ok: false, msg: "link_visit_url must be a valid URL" });
      }
      payload.link_visit_url = isNonEmptyString(link_visit_url) ? link_visit_url.trim() : link_visit_url;
    }

    if (typeof link_code_url !== "undefined") {
      if (isNonEmptyString(link_code_url) && !isURL(link_code_url)) {
        return res.status(400).json({ ok: false, msg: "link_code_url must be a valid URL" });
      }
      payload.link_code_url = isNonEmptyString(link_code_url) ? link_code_url.trim() : link_code_url;
    }

    await row.update(payload);
    res.status(200).json({ ok: true, updatedLink: row });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const deleted = await Link.destroy({ where: { link_id: id } });
    if (!deleted) {
      return res.status(404).json({ ok: false, msg: `Link not found: ${id}` });
    }
    res.status(200).json({ ok: true, deletedLink: id });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
