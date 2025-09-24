import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No books found—are you sure that’s the title?");
      } else {
        setBooks(data.docs.slice(0, 12)); // Only first 12 results
      }
    } catch (err) {
      setError("Oops! Couldn’t fetch books. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Find Your Favourite Book</h1>

      {/* Search Form */}
      <form onSubmit={searchBooks}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading... 📖</p>}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.key}>
            {book.cover_i ? (
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No cover</div>
            )}
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(", ")}</p>
            <p>{book.first_publish_year || "Unknown year"}</p>
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Info →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
