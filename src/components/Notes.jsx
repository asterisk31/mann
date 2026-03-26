import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePaste } from "../features/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Notes = () => {
  const notes = useSelector((state) => state.paste.pastes);
  //name of slice: paste, and data was named as pastes
  const [searchBarEntry, setsSearchBarEntry] = useState("");
  const dispatch = useDispatch();

  const filteredData = notes.filter((paste) =>
    paste.title.toLowerCase().includes(searchBarEntry.toLowerCase()),
  );

  function handleDelete(pasteID) {
    dispatch(deletePaste(pasteID));
    // console.log("deleting:", pasteID);
    // console.log(notes);
  }
  //console.log(notes);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Notes</h1>
          <input
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            type="search"
            placeholder="Search notes..."
            value={searchBarEntry}
            onChange={(e) => setsSearchBarEntry(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.length > 0 ? (
            filteredData.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {note.title}
                </h3>
                <p className="text-gray-600 mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {note.content}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm flex items-center gap-1">
                    ✏️ <Link to={`/?noteid=${note?._id}`}>Edit</Link>
                  </button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm flex items-center gap-1">
                    👁️ <Link to={`/notes/${note?._id}`}>View</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(note?._id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm flex items-center gap-1"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors text-sm flex items-center gap-1"
                  >
                    📋 Copy
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-1">
                    🔗 Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No notes found</p>
              <p className="text-gray-400 mt-2">Create your first note to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
