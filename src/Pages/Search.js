import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import * as BooksApi from "../BooksAPI";
function Search() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await BooksApi.search(search).then((res) => setBooks(res));
    };
    if (search.length !== 0) {
      fetchData();
    }
  }, [search]);

  const changeHandler = (e) => {
    const quary = e.target.value;
    setSearch(quary);
  };
  console.log(search);
  console.log(books);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{}</ol>
      </div>
    </div>
  );
}

export default Search;
