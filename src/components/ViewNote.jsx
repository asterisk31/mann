import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ViewNote = () => {
  const {id} =useParams();
  const allNotes= useSelector((state)=>state.paste.pastes);
  //console.log(allNotes);

  const reqd_note= allNotes.find((item)=> item._id === id);
  //console.log(reqd_note);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <Link
              to="/notes"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              ← Back to Notes
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">View Note</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={reqd_note?.title || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={reqd_note?.content || ''}
                disabled
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed resize-none"
              />
            </div>

            {reqd_note?.createdAt && (
              <div className="text-sm text-gray-500">
                Created on: {new Date(reqd_note.createdAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
