// src/components/BookCard.jsx
function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {book.cover_i ? (
        <img
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No cover
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {book.author_name?.join(", ")}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {book.first_publish_year || "Unknown year"}
        </p>
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:text-blue-800 transition-colors"
        >
          More Info →
        </a>
      </div>
    </div>
  );
}

export default BookCard;
