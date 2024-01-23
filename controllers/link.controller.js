import Link from "../models/links.model.js";
import Project from "../models/projects.model.js";

export const getLinks = async (req, res) => {
  const links = await Link.findAll({
    order: [['createdAt', 'ASC']],
    include: Project
  });
  if (!links) {
    return res.status(400).json({
      ok: false,
      msg: "No links yet",
    });
  }
  res.status(200).json({
    ok: true,
    links,
  });
};

export const getLink = async (req, res) => {
  const id = req.params.id;
  const link = await Link.findOne({
    where: {link_id: id},
    include: Project
  });
  if (!link) {
    return res.status(400).json({
      ok: false,
      msg: `This id doesn'n exist ${id}`,
    });
  }
  res.status(200).json({
    ok: true,
    link,
  });
};

export const createLink = async (req, res) => {

  const link = {
    project_id: req.body.project_id,
    link_visit_url: req.body.link_visit_url,
    link_code_url: req.body.link_code_url,
  }

  const createdLink = await Link.create(link);
  if (!createdLink) {
    return res.status(500).json({
      ok: false,
      msg: "Create error",
    });
  }
  res.status(201).json({
    ok: true,
    createdLink
  });
};

export const updateLink = async (req, res) => {
const id = req.params.id;
  const link = {
    project_id: req.body.project_id,
    link_visit_url: req.body.link_visit_url,
    link_code_url: req.body.link_code_url,
  }

  const updatedLink = await Link.update(link, {
    where: {link_id: id}
  });
  if (!updatedLink) {
    return res.status(500).json({
      ok: false,
      msg: "Update error",
    });
  }
  res.status(201).json({
    ok: true,
    updatedLink
  });
};

export const deleteLink = async (req, res) => {

  const id = req.params.id;

  const deletedLink = await Link.destroy({
    where: {link_id: id}
  });
  if (!deletedLink) {
    return res.status(500).json({
      ok: false,
      msg: "Delete error",
    });
  }
  res.status(201).json({
    ok: true,
    deletedLink
  });
};
