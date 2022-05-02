import { useEffect, useState } from "react";
import "../App.css";
import Book from "../Components/Book";
import * as BookApi from "../BooksAPI";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    return () => {
      BookApi.getAll().then((item) => {
        console.log(item);
        setData(item);
      });
    };
  }, []);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {data
                  .filter((item) => item.shelf === "currentlyReading")
                  .map((item) => (
                    <Book book={item} key={item.id} />
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {data
                  .filter((item) => item.shelf === "wantToRead")
                  .map((item) => (
                    <Book book={item} key={item.id} />
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {data
                  .filter((item) => item.shelf === "read")
                  .map((item) => (
                    <Book book={item} key={item.id} />
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"} className="link">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default Home;
