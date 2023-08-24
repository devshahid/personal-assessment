import React, { useState } from "react";
import TagModal from "../Modals/Tags/TagModal";
import axios from "axios";
import "./style.css";
const AddTags = ({ popup, setPopup }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };
  const handleTags = async () => {
    if (tags.length > 0) {
      const response = await axios.post(
        "http://localhost:8000/api/tags/createTags",
        {
          name: tags,
        }
      );
      if (response.data) {
        const { message } = response.data;
        alert(message);
        // show on modal that tags are created and clear everything
        setTags([]);
        setInputValue("");
      }
    }
  };
  return (
    <div className="AddTagsContainer">
      <TagModal
        show={popup.tags}
        onClose={() => setPopup({ ...popup, ["tags"]: false })}
      >
        <div className="modal-content">
          <p>Press Enter if you're done with your tag</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
          />
          <div className="tag-list">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button onClick={() => removeTag(index)}>x</button>
              </div>
            ))}
          </div>
          <button onClick={handleTags}>Add Tags</button>
        </div>
      </TagModal>
    </div>
  );
};

export default AddTags;
