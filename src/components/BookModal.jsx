import { useState } from "react";
import { Dialog } from "@headlessui/react";

function BookModal({ book, onClose }) {
  if (!book) return null;

  const [imgLoaded, setImgLoaded] = useState(false);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        {/* Close button (absolute top-right) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {/* Flexbox layout for content */}
        <div className="flex flex-col md:flex-row gap-6">
          {coverUrl ? (
            <div className="w-48 h-64 relative flex items-center justify-center bg-gray-100 rounded">
              {/* Loader (skeleton spinner) */}
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={coverUrl}
                alt={book.title}
                className={`w-48 h-auto object-cover rounded transition-opacity duration-500 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          ) : (
            <div className="w-48 h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              No cover
            </div>
          )}

          <div className="flex-1">
            <Dialog.Title className="text-2xl font-bold mb-2">
              {book.title}
            </Dialog.Title>
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
      </Dialog.Panel>
    </Dialog>
  );
}

export default BookModal;
