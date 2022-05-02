import React from "react";
import "../App.css";

function Book(props) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${props.data.imageLinks.thumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={props.data.shelf}
              onChange={(e) => props.changeHandler(e, props.data)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.data.title}</div>
        <div className="book-authors">{props.data.authors}</div>
      </div>
    </li>
  );
}

export default Book;
