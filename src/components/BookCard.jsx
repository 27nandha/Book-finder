import React from "react";

function BookCard({ book, onClick }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) =>
        onClick && (e.key === "Enter" || e.key === " ") && onClick()
      }
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow 
        ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Book Cover */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title || "Book cover"}
          className="w-full h-120 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No cover
        </div>
      )}

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {book.title}
        </h3>

        {/* Authors */}
        {book.author_name && (
          <p
            className="text-sm text-gray-600 mb-2 line-clamp-1"
            title={book.author_name.join(", ")}
          >
            {book.author_name.join(", ")}
          </p>
        )}

        {/* Publish year */}
        <p className="text-sm text-gray-500 mb-4">
          {book.first_publish_year || "Unknown year"}
        </p>

        {/* External link */}
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:text-blue-800 transition-colors"
          onClick={(e) => e.stopPropagation()}
          // prevents triggering onClick parent if link inside is clicked
        >
          More Info →
        </a>
      </div>
    </div>
  );
}

export default BookCard;
