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
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchBarEntry}
        onChange={(e) => setsSearchBarEntry(e.target.value)}
      />
      <div className="flex flex-col gap-5">
        {filteredData.length > 0 &&
          filteredData.map((note) => {
            return (
              <div key={note._id} className="border">
                <div>{note.title}</div>
                <div>{note.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button 
                  className="border p-2">
                    <Link to={`/?noteid=${note?._id}`}>Edit</Link>
                  </button>
                  <button className="border p-2">
                    <Link to={`/notes/${note?._id}`}> View </Link>
                  </button>
                  <button
                    onClick={
                      () => handleDelete(note?._id)
                      //here ?. is called optional chaining operator,
                      //syntax= object?.property
                      //provides a safe way to access nested object properties
                      //without explicitly checking if each intermediate property exits
                      //if a property is null or undefined, the expression short-circuits
                      //and returns undefined instead of throwing an error

                      //this means if note doesnt exist, this will return undefined
                      //instead of throwing an error
                    }
                    className="border p-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content);
                      toast.success("Copied");
                    }}
                    className="border p-2"
                  >
                    Copy
                  </button>
                  <button className="border p-2">Share</button>
                </div>
                <div>{note.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
