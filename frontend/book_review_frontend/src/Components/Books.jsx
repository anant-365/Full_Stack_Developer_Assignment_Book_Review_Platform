import React, { useContext, useState } from 'react';
import { NavLink, useOutlet, Outlet } from 'react-router-dom';
import { counterContext } from '../Context/Context';

const Books = () => {
  const bookResponse = useContext(counterContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // 🔸 Customize how many books per page
  const outlet = useOutlet();

  // Filter books based on search
  const filteredBooks = bookResponse.bookData.filter((book) =>
    Object.values(book).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  return (
    <>
      {outlet ? (
        <Outlet />
      ) : (
        <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
          <h1 className="text-3xl font-bold text-center text-lime-300 mb-6">All Books</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
              className="p-2 w-full max-w-md bg-gray-800 text-white border border-gray-600 rounded-md"
            />
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.length > 0 ? (
              currentBooks.map((e) => (
                <div key={e['_id']} className="bg-gray-800 p-4 rounded-lg shadow-lg text-lime-100">
                  {e.coverImage && (
                    <img
                      src={e.coverImage}
                      alt={e.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                  )}
                  <h2 className="text-2xl font-bold text-lime-300 mb-1">{e.title}</h2>
                  <p className="text-sm italic mb-1">By {e.author}</p>
                  {e.genre && <p className="text-sm mb-1">Genre: {e.genre}</p>}
                  {e.summary && (
                    <p className="text-sm text-gray-300 mb-2">
                      {e.summary.length > 120 ? `${e.summary.slice(0, 120)}...` : e.summary}
                    </p>
                  )}
                  <p className="text-sm mb-1">Published: {e.publicationYear || 'N/A'}</p>
                  <p className="text-sm mb-1">ISBN: {e.isbn || 'N/A'}</p>
                  <p className="text-sm mb-1">👍 Likes: {e.likes || 0}</p>
                  <p className="text-sm mb-1">💬 User Reviews: {e.comments?.length || 0}</p>
                  <p className="text-sm font-bold italic mt-2">Added By: {e.addedBy || 'Unknown'}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last Reviewed: {new Date(e.lastReviewed).toLocaleDateString()}
                  </p>
                  <NavLink
                    to={`showBook/${e['_id']}`}
                    className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
                  >
                    Show Details
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="text-center col-span-4 text-lime-300">No books found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredBooks.length > booksPerPage && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold cursor-pointer ${
                      page === currentPage
                        ? 'bg-lime-400 text-gray-900'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Books;