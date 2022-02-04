const db = require("../db");
//Ici se fait la récupération des données. 


//récupérer tous les contacts.
const findMany = async () => {
  return db.promise().query("SELECT * from contact");
};

//créer un nouveau contact.
const create = async ({firstname, lastname, email}) => {
  return db.promise().query("INSERT INTO contact (firstname, lastname, email) VALUES (?, ?, ?)", [firstname, lastname, email]);
};

//supprimer un contact. 
const delete_ = (id) => {
  return db.promise().query("DELETE FROM contact WHERE id = ?", [id]);
};

//modifier un contact. 
const update = (id, newAttributes) => {
  return db.promise().query("UPDATE contact SET ? WHERE id= ?", [newAttributes, id]);
}
module.exports = { findMany, create, delete_, update };
