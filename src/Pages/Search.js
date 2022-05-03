import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import * as BooksApi from "../BooksAPI";
import Book from "../Components/Book";
function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([] || {});
  const [updatedData, setUpdatedData] = useState({});

  // search
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get  all search results
        const res = await BooksApi.search(query);

        // create an array for books by geting id
        let selectedBook = [];
        for (let i = 0; i < res.length; i++) {
          selectedBook = [...selectedBook, await BooksApi.get(res[i].id)];
        }

        // update the Books value
        setBooks(selectedBook);
      } catch (error) {
        console.log(error);
      }
    };
    if (query.length !== 0) {
      fetchData();
    } else {
      setBooks([]);
    }
  }, [query]);

  // update data after getting change in shelf
  useEffect(() => {
    // first update the book's shelf
    const update = async () => {
      try {
        await BooksApi.update(updatedData.book, updatedData.shelf);
      } catch (error) {
        console.log(error);
      }
    };
    // prevent the update function from rendering after first render
    if (updatedData.shelf !== undefined) {
      update();
    }
  }, [query, updatedData]);

  const queryHandler = (e) => {
    const q = e.target.value;
    setQuery(q.toLowerCase());
  };

  const changeHandler = (e, book) => {
    book.shelf = e.target.value;
    setUpdatedData({ book: book, shelf: e.target.value });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={queryHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.error ? (
            <div className="noResults">
              <h5>No results, Please try again</h5>
            </div>
          ) : (
            books.map((item) => (
              <Book book={item} changeHandler={changeHandler} key={item.id} />
            ))
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
