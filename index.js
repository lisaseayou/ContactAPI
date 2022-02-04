require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// require("./routes")(app);

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
