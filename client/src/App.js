import React, { useState } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";

import "./App.css";

function App() {
  const [bookListChanged, setBookListChanged] = useState(false); 
  const handleBookAdded = () => {
    setBookListChanged(!bookListChanged); 
  };

  return (
    <div className="app">
      <BrowserRouter>
        
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
