import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./BookList.css";
import logo from './Logo.png';

function BookList() {
  // State to hold the array of books and search input
  const [booksArray, setBooksArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch books from the API when the component mounts
  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooksArray(response.data.books);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter books based on search input
// Filter books based on search input
const filteredBooks = booksArray.filter((book) => {
  if (searchInput.trim() === "") {
    return true; // Return all books if search input is empty
  } else {
    const searchKeywords = searchInput.toLowerCase().split(" ");

    if (searchKeywords.length === 1) {
      // Single-word search
      const searchKeyword = searchKeywords[0];
      const title = book.title.toLowerCase();
      return title.includes(searchKeyword);
    } else {
      // Multi-word search
      const titleWords = book.title.toLowerCase().split(" ");

      // Check if title has at least as many words as search keywords
      if (titleWords.length < searchKeywords.length) return false;

      // Check if the title words match the search keywords
      for (let i = 0; i < searchKeywords.length; i++) {
        if (!titleWords[i].startsWith(searchKeywords[i])) {
          return false;
        }
      }
      return true;
    }
  }
});


  return (
    <div className="book-list-container">
      <div className="header">
        <img id="logo" src={logo} alt="Logo" />
        <h2> Kalvium Library</h2>
        {/* Search bar */}
        <div className="search-bar-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
        {/* Registration button */}
        <NavLink to="/register">
          <button className="register-button">Register</button>
        </NavLink>
      </div>

      {/* Display filtered books or a message if no results */}
      <div className="book-list">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img
                  className="book-thumbnail"
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                />
              </div>
              <div className="book-details">
                <p className="book-title">{book.title}</p>
                <p className="book-authors">{book.authors.join(", ")}</p>
                <p className="book-rating">
                  Rating: 🌟 {book.averageRating || "--"}/5
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No matching books found.</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
