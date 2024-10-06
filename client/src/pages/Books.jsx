import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Books.css"; // Importing the CSS for styling

const Books = ({ bookListChanged }) => {
  const [books, setBooks] = useState([]);

  // Fetch all books
  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Fetch books whenever the bookListChanged prop updates
  useEffect(() => {
    fetchAllBooks();
  }, [bookListChanged]);

  // Handle book deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/books/${id}`);
      fetchAllBooks(); // Re-fetch books after deletion
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div>
      <div className="header">
        <img src="/assets/book.png" alt="Book Icon" className="header-icon" />
        <h1>The Reading Room</h1> {/* This will now have the same styling as h2 */}
      </div>
      <div className="books-container">
        <div className="books">
          {books.map((book) => (
            <div key={book.id} className="book">
              <img src={book.cover} alt={book.title} />
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <span>${book.price}</span>
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  Update
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
