import React, { useState, useEffect, useContext } from 'react';
import { addNote, getPublicNotes, getMyNotes, updateNote, deleteNote } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { FiBookmark, FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';

export default function NotesList() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [publicNotes, setPublicNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [activeTab, setActiveTab] = useState('my-notes');

  useEffect(() => {
    loadNotes();
  }, [activeTab]);

  const loadNotes = async () => {
    try {
      if (activeTab === 'my-notes') {
        const response = await getMyNotes();
        setNotes(response.data);
      } else {
        const response = await getPublicNotes();
        setPublicNotes(response.data);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addNote({ title, content, isPublic });
      toast.success('Note created successfully!');
      setTitle('');
      setContent('');
      setShowModal(false);
      loadNotes();
    } catch (error) {
      toast.error('Error creating note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      toast.success('Note deleted!');
      loadNotes();
    } catch (error) {
      toast.error('Error deleting note');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600 mb-8 flex items-center gap-3">
          <FiBookmark className="text-4xl" /> Notes
        </h1>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 flex gap-4">
            {['my-notes', 'public'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-bold transition capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-yellow-500'
                }`}
              >
                {tab === 'my-notes' ? '📝 My Notes' : '🌐 Public Notes'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition flex items-center gap-2"
          >
            <FiPlus /> New Note
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Note</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                    placeholder="Note title..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 resize-none h-40"
                    placeholder="Write your note here..."
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-5 h-5 text-yellow-600 rounded"
                  />
                  <span className="text-gray-700 font-semibold">Make this note public</span>
                </label>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddNote}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                  >
                    Create Note
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:shadow-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'my-notes' ? notes : publicNotes).map((note) => (
            <div key={note._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  By: {note.userId?.username || 'Unknown'}
                </span>
                {activeTab === 'my-notes' && (
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
