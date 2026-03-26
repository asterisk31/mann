import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewNote = () => {
  const {id} =useParams();
  const allNotes= useSelector((state)=>state.paste.pastes);
  //console.log(allNotes);

  const reqd_note= allNotes.find((item)=> item._id === id);
  //console.log(reqd_note);


  return (
    <div className="container">
      {" "}
      <div className="form-row">
        {" "}
        <input
          type="text"
          placeholder="enter title here"
          value={reqd_note.title}
          disabled
        />
        
      </div>
      <div className="content-boxF">
        {" "}
        {/* Below for textarea */}
        <textarea
          value={reqd_note.content}
          placeholder="Enter Text Here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewNote;
