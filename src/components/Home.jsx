import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPaste } from "../features/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const noteID = searchParams.get("noteid");
  const dispatch = useDispatch();

  const allNotes = useSelector((state) => state.paste.pastes);

  function create() {
    //here we want to create data of note and fwd it to slice
    const note = {
      title: title,
      content: value,
      _id: noteID || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (noteID) {
      //that means we're just updating the note
      dispatch(updateToPaste(note));
    } else {
      //that means we're creatig new note
      dispatch(addToPastes(note));
    }
    //for both these cases, logic is inside pasteSlice, to use reducer functions there, we need to use dispatcher

    //afte4r creation, or updation- we need everything reset
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  // React.useEffect(() => {
  //     console.log('Effect running, noteID:', noteID); // Add this
  //     if (noteID) {
  //         console.log('Updating note:', noteid);
  //     }
  // }, [noteID]);

  // Load existing note data into state when noteID changes
  useEffect(
    () => {
      if (noteID) {
        const existingNote = allNotes.find((item) => item._id === noteID);
        if (existingNote) {
          setTitle(existingNote.title);
          setValue(existingNote.content);
        }
      } else {
        // Reset for new note creation
        setTitle("");
        setValue("");
      }
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    [noteID], //commment above used to disable warning regarding missing allNotes dependency
    //having allNotes as a dep might trigger cascading renders(inf loops), tho here in practice it wont do so
    //because it effectively runs just one more extra time
  );

  // useEffect(() => {
  //   if (noteID) {
  //     const existingNote = allNotes.find((item) => item._id === noteID);
  //     if (existingNote) {
  //       // Only update state if data actually differs
  //       setTitle((prevTitle) => prevTitle !== existingNote.title ? existingNote.title : prevTitle);
  //       setValue((prevValue) => prevValue !== existingNote.content ? existingNote.content : prevValue);
  //     }
  //   } else {
  //     setTitle("");
  //     setValue("");
  //   }
  // }, [noteID, allNotes]); // Now safe to include allNotes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {!noteID && (
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">मन</h1>
              <p className="text-gray-600 dark:text-gray-400">Journalling/Logging</p>
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {noteID ? 'Edit Note' : 'Create New Note'}
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={create}
                className="px-6 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-offset-2 transition-colors font-medium flex items-center gap-2"
              >
                {noteID ? '✏️ Update Note' : '➕ Create Note'}
              </button>
            </div>

            <div>
              <textarea
                value={value}
                placeholder="Enter your note content here..."
                onChange={(e) => setValue(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
