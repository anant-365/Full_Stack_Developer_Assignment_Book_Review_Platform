import React, { useContext, useState } from 'react';
import { useOutlet, useParams } from 'react-router-dom';
import { counterContext } from '../Context/Context';
import axios from 'axios';
import {
  FaHeart,
  FaCommentAlt,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaFeatherAlt,
  FaTags,
  FaInfoCircle,
  FaPlus,
} from 'react-icons/fa';

const Show = () => {
  const outlet = useOutlet();
  const { bookId } = useParams();
  const { bookData } = useContext(counterContext);

  const selectedBook = bookData.find(
    (data) => data._id === bookId.replace(/^:/, '')
  );

  const [likes, setLikes] = useState(selectedBook?.likes || 0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(selectedBook?.comments || []);

  const handleLike = () => setLikes((prev) => prev + 1);

  const handlePostUpdate = async () => {
    let updatedComments = [...comments];
  
    // If new comment exists, prepend it to existing comments
    if (newComment.trim()) {
      const comment = {
        text: newComment,
        author: 'Anonymous',
        createdAt: new Date().toISOString(),
      };
      updatedComments = [comment, ...comments];
      setComments(updatedComments);
      setNewComment('');
    }
  
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/posts/${selectedBook.isbn}/likenreview`,
        {
          likeCount: likes,
          comments: updatedComments,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Error updating like/comment:', error);
    }
    window.location.reload();
  };

  return (
    <>
      {outlet ? (
        <Outlet />
      ) : selectedBook ? (
        <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6 min-h-screen flex flex-col items-center">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-5xl grid md:grid-cols-2 gap-8">
  {/* Book Cover */}
  <div className="flex justify-center items-center">
    <img
      src={selectedBook.coverImage}
      alt={selectedBook.title}
      className="w-72 h-[420px] object-cover rounded-xl shadow-lg border-4 border-lime-300"
    />
  </div>

  {/* Book Details */}
  <div className="flex flex-col justify-between">
    <div>
      <h2 className="text-4xl font-bold text-lime-300 mb-3 flex items-center gap-2">
        <FaBook /> {selectedBook.title}
      </h2>
      <p className="mb-2 flex items-center gap-2 text-sm">
        <FaFeatherAlt /> <span className="font-semibold">Author:</span> {selectedBook.author}
      </p>
      <p className="mb-2 flex items-center gap-2 text-sm">
        <FaTags /> <span className="font-semibold">Genre:</span> {selectedBook.genre}
      </p>
      <p className="mb-2 flex items-center gap-2 text-sm">
        <FaCalendarAlt /> <span className="font-semibold">Published:</span> {selectedBook.publicationYear}
      </p>
      <p className="mb-2 flex items-center gap-2 text-sm">
        <FaUser /> <span className="font-semibold">Added By:</span> {selectedBook.addedBy || 'Unknown'}
      </p>
      <p className="mb-2 flex items-start gap-2 text-sm">
        <FaInfoCircle className="mt-1" /> 
        <span>
          <span className="font-semibold">Summary:</span> {selectedBook.summary}
        </span>
      </p>
      <p className="text-xs text-gray-400 mt-2">
        🕒 Last Reviewed: {new Date(selectedBook.lastReviewed).toLocaleString()}
      </p>
    </div>

    {/* Likes & Comment Count */}
    <div className="flex items-center gap-6 mt-4">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-full"
      >
        <FaHeart /> {likes}
      </button>
      <span className="flex items-center gap-2 text-sm text-gray-200">
        <FaCommentAlt /> {comments.length} User Reviews
      </span>
    </div>
  </div>
</div>

          {/* Comment Section */}
          <div className="bg-gray-800 mt-8 w-full max-w-5xl p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-lime-300 flex items-center gap-2">
              <FaCommentAlt /> User Reviews
            </h3>

            {/* Add Comment */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-300"
              />
              <button
                onClick={handlePostUpdate}
                className="bg-lime-500 hover:bg-lime-600 text-black px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaPlus /> Post
              </button>
            </div>

            {/* Display Comments */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg shadow-md">
                  <p className="text-sm text-white">{comment.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    — {comment.author || 'Anonymous'}, {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-gray-400 italic">No User Reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lime-300 p-6">Book not found.</p>
      )}
    </>
  );
};

export default Show;