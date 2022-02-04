require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



const port = process.env.PORT || 3030;

app.get("/api/contact", (request, res) => {
  connection.query("SELECT * FROM contact", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

app.post("/api/contact", (req, res) => {
  const { firstname, lastname, email } = req.body;
  connection.query(
    "INSERT INTO contact (firstname, lastname, email) VALUES (?, ?, ?)",
    [firstname, lastname, email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the contact");
      } else {
        res.status(200).send("Contact successfully saved");
      }
    }
  );
});

app.delete("/api/contact/:id", (req, res) => {
  const contactId = req.params.id;
  connection.query(
    "DELETE FROM contact WHERE id = ?",
    [contactId],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send("Error deleting a contact");
      } else {
        res.status(200).send("Contact successfully deleted");
      }
    }
  );
});

app.put('/api/contact/:id', (req, res) => {
  const contactId = req.params.id;
  connection.query(
    'SELECT * FROM contact WHERE id = ?',
    [contactId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a contact');
      } else {
        const contactFromDb = selectResults[0];
        if (contactFromDb) {
          const contactToUpdate = req.body;
          connection.query(
            'UPDATE contact SET ? WHERE id = ?',
            [contactToUpdate, contactId],
            (err) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error updating a contact');
              } else {
                const updated = { ...contactFromDb, ...contactToUpdate };
                res.status(200).json(updated);
              }
            }
          );
        } else {
          res.status(404).send(`Contact with id ${contactId} not found.`);
        }
      }
    }
  );
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
