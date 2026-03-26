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
    <div className="container">
      {" "}
      <div className="form-row">
        {" "}
        {/* Horizontal row for title and button */}
        <input
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            //console.log(e.target.value);
          }}
        />
        <button onClick={create}>
          {
            noteID ? "Update Note" : "Create new" //conditional rendering
          }
        </button>
      </div>
      <div className="content-boxF">
        {" "}
        {/* Below for textarea */}
        <textarea
          value={value}
          placeholder="Enter Text Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
