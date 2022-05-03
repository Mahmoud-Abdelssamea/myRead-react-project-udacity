import React from "react";
import "../App.css";

function Book({ book, changeHandler }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && `url("${book.imageLinks.thumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf !== "" ? book.shelf : "none"}
              onChange={(e) => {
                changeHandler(e, book);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
                {book.shelf === "currentlyReading" && "✓ "}
                Currently Reading
              </option>
              <option value="wantToRead">
                {book.shelf === "wantToRead" && "✓ "} Want to Read
              </option>
              <option value="read">{book.shelf === "read" && "✓ "} Read</option>
              <option value="none">
                {book.shelf !== "read" &&
                  book.shelf !== "wantToRead" &&
                  book.shelf !== "currentlyReading" &&
                  "✓ "}
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors}</div>
      </div>
    </li>
  );
}

export default Book;
