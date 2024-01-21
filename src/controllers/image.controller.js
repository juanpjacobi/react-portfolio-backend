import Image from "../models/images.model.js";
import Project from "../models/projects.model.js";

export const getImages = async (req, res) => {
  const images = await Image.findAll({
    order: [['createdAt', 'ASC']],
    include: Project
  });
  if (!images) {
    return res.status(400).json({
      ok: false,
      msg: "No images yet",
    });
  }
  res.status(200).json({
    ok: true,
    images,
  });
};

export const getImage = async (req, res) => {
  const id = req.params.id;
  const image = await Image.findOne({
    where: {image_id: id}
  });
  if (!image) {
    return res.status(400).json({
      ok: false,
      msg: `This id doesn'n exist ${id}`,
    });
  }
  res.status(200).json({
    ok: true,
    image,
  });
};

export const createImage = async (req, res) => {

  const image = {
    project_id: req.body.project_id,
    image_url: req.body.image_url,
    image_alt: req.body.image_alt,
  }

  const createdImage = await Image.create(image);
  if (!createdImage) {
    return res.status(500).json({
      ok: false,
      msg: "Create error",
    });
  }
  res.status(201).json({
    ok: true,
    createdImage
  });
};

export const updateImage = async (req, res) => {

  const id = req.params.id;

  const image = {
    project_id: req.body.project_id,
    image_url: req.body.image_url,
    image_alt: req.body.image_alt,
  }

  const updatedImage = await Image.update(image, {
    where: {image_id: id}
  });
  if (!updatedImage) {
    return res.status(500).json({
      ok: false,
      msg: "Update error",
    });
  }
  res.status(201).json({
    ok: true,
    updatedImage
  });
};

export const deleteImage = async (req, res) => {

  const id = req.params.id;


  const deletedImage = await Image.destroy({
    where: {image_id: id}
  });
  if (!deletedImage) {
    return res.status(500).json({
      ok: false,
      msg: "Delete error",
    });
  }
  res.status(201).json({
    ok: true,
    deletedImage
  });
};