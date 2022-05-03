import { useEffect, useState } from "react";
import "../App.css";
import Book from "../Components/Book";
import * as BookApi from "../BooksAPI";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({});

  // set effect to get all data in after first render
  useEffect(() => {
    return () => {
      BookApi.getAll().then((item) => {
        setData(item);
      });
    };
  }, []);

  // set the effect after every update in the shelf for every book
  useEffect(() => {
    // first update the book's shelf
    const update = async () => {
      await BookApi.update(updatedData.book, updatedData.shelf);

      // second get all books again from database
      await BookApi.getAll().then((item) => {
        setData(item);
      });
    };
    // prevent the update function from rendering after first render
    if (updatedData.shelf !== undefined) {
      update();
    }
  }, [updatedData]);

  //a function to  handle the shelf change for every book as it give us the event and the book data to update.
  const changeHandler = (e, book) => {
    setUpdatedData({ book: book, shelf: e.target.value });
  };
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
                    <Book
                      book={item}
                      changeHandler={changeHandler}
                      key={item.id}
                    />
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
                    <Book
                      book={item}
                      changeHandler={changeHandler}
                      key={item.id}
                    />
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
                    <Book
                      book={item}
                      changeHandler={changeHandler}
                      key={item.id}
                    />
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
