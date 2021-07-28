const Note = require("../models/Note");
const { validationResult } = require("express-validator");

exports.createNote = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Crear una nueva agenda
    const note = new Note(req.body);

    //Guardar el conductor via JWT
    note.driver = req.driver.id;

    //guardamos la agenda
    note.save();
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ups, an error occurred...");
  }
};

//Obtiene la agenda del usuario actual
exports.getNote = async (req, res) => {
  try {
    const note = await Note.find({ driver: req.driver.id });
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ups, an error occurred...");
  }
};

//Obtener todas las notas
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ notes });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ups, an error ocurred...");
  }
};

//Actualiza la agenda
exports.updateNote = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //revisar si existe la nota
    let note = await Note.find({ driver: req.driver.id });

    //si la agenda no existe
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    //actualizar
    note = await Note.findOneAndUpdate(
      { driver: req.driver.id },
      { $set: req.body },
      { new: false }
    );

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ups, an error occurred...");
  }
};
