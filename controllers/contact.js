const { findMany, create, delete_ } = require("../models/contact");
//Ici sont gérées les requêtes utilisateurs et des réponses sont envoyées. 

const getContact = async (req, res) => {
  const [contact] = await findMany(req.query);
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  try {
    await create(req.body);
    res.status(201).send("Contact has been created");
  } catch (err) {
    res.status(500).send("Error creating contact");
  }
};

const deleteContact = async (req, res) => {
  try {
    await delete_(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting contact");
  }
};

const updateContact = async (req, res) => {
  try { 
    await update(req.params.id, req.body);
    res.status(200).send("Contact has been updated");
  } catch (err) {
    res.status(500).send("Error updating contact")
  }
}

module.exports = {
  getContact,
  createContact,
  deleteContact, 
  updateContact
};
