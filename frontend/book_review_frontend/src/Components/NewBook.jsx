import React, { useState } from 'react';
import axios from 'axios';
import {
    FaBook,
    FaUser,
    FaBarcode,
    FaImage,
    FaRegFileAlt,
    FaPlusCircle,
    FaInfoCircle,
    FaCalendarAlt,
    FaTags,
} from 'react-icons/fa';

const NewBook = () => {
    const [newBook, setNewBook] = useState({
        title: 'atrox curso dolorem',
        author: 'Mr. Allan Paucek',
        isbn: '85c7c42a-a16b-4f7a-8ee6-524b2d4aec26',
        coverImage: 'https://picsum.photos/seed/aSreho/300/400?blur=5',
        summary: 'Vir curo vobis vulnus timor aptus adhaero theologus coruscus. Assentat…',
        genre: 'Fantasy',
        publicationYear: 1990,
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setNewBook((prev) => ({
            ...prev,
            [name]: name === 'publicationYear' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_SERVER}/books`,
            data: newBook,
            withCredentials: true,
        })
            .then((response) => {
                alert('New Book Added');
            })
            .catch((err) => {
                console.error(err.response.data.message);
                alert(err.response.data.message);
            });
    };

    return (
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-2xl font-bold text-lime-300 mb-2 flex items-center justify-center">
                        <FaInfoCircle className="mr-2 text-lime-300" />
                        Add a New Book
                    </h2>
                    <p className="text-lg">Share a book you love with the community by adding its details below! Sample input is provided below.</p>
                </div>

                <h1 className="text-3xl font-bold text-center text-lime-300 mb-6 flex items-center justify-center">
                    <FaPlusCircle className="mr-2 text-lime-300" />
                    New Book Entry
                </h1>

                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lime-300 mb-2 flex items-center">
                        <FaBook className="mr-2" />
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={newBook.title}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* Author */}
                <div className="mb-4">
                    <label htmlFor="author" className="block text-lime-300 mb-2 flex items-center">
                        <FaUser className="mr-2" />
                        Author:
                    </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={newBook.author}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* ISBN */}
                <div className="mb-4">
                    <label htmlFor="isbn" className="block text-lime-300 mb-2 flex items-center">
                        <FaBarcode className="mr-2" />
                        ISBN (must be unique and changed):
                    </label>
                    <input
                        type="text"
                        name="isbn"
                        id="isbn"
                        value={newBook.isbn}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* Genre */}
                <div className="mb-4">
                    <label htmlFor="genre" className="block text-lime-300 mb-2 flex items-center">
                        <FaTags className="mr-2" />
                        Genre:
                    </label>
                    <input
                        type="text"
                        name="genre"
                        id="genre"
                        value={newBook.genre}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* Publication Year */}
                <div className="mb-4">
                    <label htmlFor="publicationYear" className="block text-lime-300 mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Publication Year:
                    </label>
                    <input
                        type="number"
                        name="publicationYear"
                        id="publicationYear"
                        value={newBook.publicationYear}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* Cover Image URL */}
                <div className="mb-4">
                    <label htmlFor="coverImage" className="block text-lime-300 mb-2 flex items-center">
                        <FaImage className="mr-2" />
                        Cover Image URL:
                    </label>
                    <input
                        type="text"
                        name="coverImage"
                        id="coverImage"
                        value={newBook.coverImage}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* Summary */}
                <div className="mb-4">
                    <label htmlFor="summary" className="block text-lime-300 mb-2 flex items-center">
                        <FaRegFileAlt className="mr-2" />
                        Summary:
                    </label>
                    <textarea
                        name="summary"
                        id="summary"
                        rows="3"
                        value={newBook.summary}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full p-3 bg-green-500 text-gray-900 font-bold rounded hover:bg-lime-400 transition duration-200"
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default NewBook;