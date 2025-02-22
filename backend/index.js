import express from "express";
import mysql2 from "mysql2/promise"; 
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  
  queueLimit: 0,
});


db.getConnection()
  .then(connection => {
    console.log('Connected to the database.');
    connection.release(); 
  .catch(err => {
    console.error('Database connection failed:', err.stack);
  });


app.get("/api/books", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM books");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/books", async (req, res) => {
  const { title, description, price, cover } = req.body;

  // Validate that all fields are provided
  if (!title || !description || !price || !cover) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO books (title, description, price, cover) VALUES (?, ?, ?, ?)",
      [title, description, price, cover]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: err.message });
  }
});


app.put("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, description, price, cover } = req.body;


  if (!title || !description || !price || !cover) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?",
      [title, description, price, cover, bookId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: err.message });
  }
});


app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const [result] = await db.query("DELETE FROM books WHERE id = ?", [bookId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
