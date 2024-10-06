import React, { useState } from "react"; // Add useState here
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";

import "./App.css";

function App() {
  const [bookListChanged, setBookListChanged] = useState(false); // Now useState is properly defined

  const handleBookAdded = () => {
    setBookListChanged(!bookListChanged); // This triggers re-fetch in Books.jsx
  };

  return (
    <div className="app">
      <BrowserRouter>
         {/* Add the Navbar component here */}
        <Routes>
          <Route path="/" element={<Books bookListChanged={bookListChanged} />} />
          <Route path="/add" element={<Add onBookAdded={handleBookAdded} />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
