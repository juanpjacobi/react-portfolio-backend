import Image from "../models/images.model.js";
import Project from "../models/projects.model.js";

// helpers
const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isURL = (v) => {
  if (!isNonEmptyString(v)) return false;
  try { new URL(v); return true; } catch { return false; }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.findAll({
      order: [["createdAt", "ASC"]],
      include: Project
    });

    if (!images || images.length === 0) {
      return res.status(200).json({ ok: true, images: [] });
    }
    res.status(200).json({ ok: true, images });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const image = await Image.findOne({ where: { image_id: id } });
    if (!image) {
      return res.status(404).json({ ok: false, msg: `Image not found: ${id}` });
    }
    res.status(200).json({ ok: true, image });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const createImage = async (req, res) => {
  try {
    const { project_id, image_url, image_alt } = req.body;

    // Reglas mínimas:
    // - project_id requerido y válido
    // - image_url requerido y URL válida
    if (!isNonEmptyString(project_id)) {
      return res.status(400).json({ ok: false, msg: "project_id is required" });
    }
    if (!isNonEmptyString(image_url) || !isURL(image_url)) {
      return res.status(400).json({ ok: false, msg: "image_url must be a valid URL" });
    }

    // Validar que exista el proyecto
    const project = await Project.findOne({ where: { project_id } });
    if (!project) {
      return res.status(400).json({ ok: false, msg: `Project not found: ${project_id}` });
    }

    const image = {
      project_id,
      image_url: image_url.trim(),
      image_alt: isNonEmptyString(image_alt) ? image_alt.trim() : image_alt ?? null,
    };

    const createdImage = await Image.create(image);
    if (!createdImage) {
      return res.status(500).json({ ok: false, msg: "Create error" });
    }
    res.status(201).json({ ok: true, createdImage });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const updateImage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const { project_id, image_url, image_alt } = req.body;

    // Debe venir al menos un campo a actualizar
    if (
      typeof project_id === "undefined" &&
      typeof image_url === "undefined" &&
      typeof image_alt === "undefined"
    ) {
      return res.status(400).json({ ok: false, msg: "At least one field is required to update" });
    }

    const row = await Image.findOne({ where: { image_id: id } });
    if (!row) {
      return res.status(404).json({ ok: false, msg: `Image not found: ${id}` });
    }

    const payload = {};
    if (typeof project_id !== "undefined") {
      if (!isNonEmptyString(project_id)) {
        return res.status(400).json({ ok: false, msg: "project_id must be a non-empty string" });
      }
      const project = await Project.findOne({ where: { project_id } });
      if (!project) {
        return res.status(400).json({ ok: false, msg: `Project not found: ${project_id}` });
      }
      payload.project_id = project_id;
    }

    if (typeof image_url !== "undefined") {
      if (isNonEmptyString(image_url) && !isURL(image_url)) {
        return res.status(400).json({ ok: false, msg: "image_url must be a valid URL" });
      }
      payload.image_url = isNonEmptyString(image_url) ? image_url.trim() : image_url;
    }

    if (typeof image_alt !== "undefined") {
      payload.image_alt = isNonEmptyString(image_alt) ? image_alt.trim() : image_alt;
    }

    await row.update(payload);
    res.status(200).json({ ok: true, updatedImage: row });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isNonEmptyString(id)) {
      return res.status(400).json({ ok: false, msg: "Param id is required" });
    }

    const deleted = await Image.destroy({ where: { image_id: id } });
    if (!deleted) {
      return res.status(404).json({ ok: false, msg: `Image not found: ${id}` });
    }
    res.status(200).json({ ok: true, deletedImage: id });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
