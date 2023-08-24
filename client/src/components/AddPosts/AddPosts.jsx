import React, { useState, useEffect } from "react";
import axios from "axios";
import TagModal from "../Modals/Tags/TagModal";
import "./style.css";
const NewPostModal = ({ setPopup, popup, tagList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState(tagList);
  const [selectedImage, setSelectedImage] = useState(null);
  const [remainingTags, setRemainingTags] = useState(allTags);
  useEffect(() => {
    const getAllTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tags/getAllTags"
        );
        if (response.status === 200 && response.data) {
          setAllTags(response.data.tags);
          setRemainingTags(response.data.tags);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllTags();
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const handleClose = () => {
    setPopup({ ...popup, ["post"]: false });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("desc", description);
      formdata.append("tags", JSON.stringify(selectedTags));
      formdata.append("selectedImage", selectedImage);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/posts/createPost",
          formdata
        );
        console.log("Image uploaded:", response.data);
        alert("Post create successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleTagChange = (event) => {
    const selectedTagId = event.target.value;
    const selectedTag = allTags.find((tag) => tag._id === selectedTagId);
    setSelectedTags([...selectedTags, selectedTag]);
    setRemainingTags(remainingTags.filter((tag) => tag._id !== selectedTagId));
  };

  const handleRemoveTag = (tagId) => {
    const removedTag = selectedTags.find((tag) => tag._id === tagId);
    setSelectedTags(selectedTags.filter((tag) => tag._id !== tagId));
    setRemainingTags([...remainingTags, removedTag]);
  };
  return (
    <div className="AddPostContainer">
      <TagModal
        show={popup.post}
        onClose={() => setPopup({ ...popup, ["post"]: false })}
      >
        <div className="AddPostPopContainer">
          <div className="formHeaders">
            <h2>Create New Post</h2>
            <button onClick={handleClose}>x</button>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              multiple
              onChange={handleTagChange}
              disabled={remainingTags.length === 0}
              size={remainingTags.length > 3 ? 3 : remainingTags.length}
              name="tags"
            >
              {remainingTags.length === 0 && <option>No options left</option>}
              {remainingTags.map((tag) => (
                <option key={tag._id} value={tag._id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <div className="selected-tags">
              {selectedTags.map((tag) => (
                <div key={tag._id} className="selected-tag">
                  {tag.name}
                  <button onClick={() => handleRemoveTag(tag._id)}>x</button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </TagModal>
    </div>
  );
};

export default NewPostModal;
