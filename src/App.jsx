import { useState } from "react";
import axios from "axios";
import BookCard from "./components/BookCard";
import Pagination from "./components/Pagination";
import BookModal from "./components/BookModal";

function App() {
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  const resultsPerPage = 8;

  const searchBooks = async (e) => {
    e?.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setAllBooks([]);
    setCurrentPage(1);

    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );

      if (!res.data.docs || res.data.docs.length === 0) {
        setError("No books found—are you sure that’s the title?");
      } else {
        setAllBooks(res.data.docs);
      }
    } catch (err) {
      setError("Oops! Couldn’t fetch books. Try again.");
    }
    setLoading(false);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedBooks = allBooks.slice(
    startIndex,
    startIndex + resultsPerPage
  );
  const totalPages = Math.ceil(allBooks.length / resultsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Find Your Favourite Book
        </h1>

        {/* Search */}
        <form onSubmit={searchBooks} className="max-w-xl mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a book..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600 mb-8">{error}</p>}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedBooks.map((book) => (
            <div
              key={book.key}
              onClick={() => setSelectedBook(book)}
              className="cursor-pointer"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default App;