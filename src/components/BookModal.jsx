const BookModel = ({ book, onClose }) => {
  if (!book) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {book.cover_i ? (
            <img
              src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
              className="w-48 h-auto object-cover rounded"
            />
          ) : (
            <div className="w-48 h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              No cover
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Author:</strong>{" "}
              {book.author_name?.join(", ") || "Unknown"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>First Published:</strong>{" "}
              {book.first_publish_year || "Unknown"}
            </p>
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View on OpenLibrary ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModel;
