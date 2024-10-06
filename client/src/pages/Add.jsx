import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css";

const Add = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value, // Convert price to a number
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(false); // Reset error state before submission
    if (!book.title || !book.description || book.price === null || !book.cover) {
      setError("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:8800/api/books", book); // Ensure the correct endpoint
      onBookAdded(); // Call this function to refresh the book list
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Book description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
