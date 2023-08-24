import React, { useState, useEffect } from "react";
import NewPostModal from "./AddPosts/AddPosts";
import AddTags from "./AddTags/AddTags";
import axios from "axios";
import "./style.css";
const Posts = () => {
  const [popup, setPopup] = useState({
    tags: false,
    post: false,
  });
  const [allTags, setAllTags] = useState([]);
  const [postData, setPostData] = useState([]);
  const [tempPost, setTempPost] = useState(postData);
  const [query, setQuery] = useState("");
  const handleClick = (e) => {
    setPopup({
      ...popup,
      [e.target.name]: true,
    });
  };
  useEffect(() => {
    const getAllTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tags/getAllTags"
        );
        if (response.status === 200 && response.data) {
          setAllTags(response.data.tags);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getAllImages = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/posts/getAllPosts"
      );
      const { posts } = response.data;
      if (posts.length > 0) {
        setPostData(posts);
        setTempPost(posts);
      }
    };
    getAllTags();
    getAllImages();
  }, [popup]);
  const handleSort = (e) => {
    const selectedTag = e.target.value;
    if (postData.length > 0) {
      const newPosts = postData.filter((post) => {
        if (post.tags.includes(selectedTag)) {
          return post;
        }
      });
      setTempPost(newPosts);
    }
  };
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    const filteredResults = postData.filter(
      (item) =>
        item.title.toLowerCase().includes(newQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(newQuery.toLowerCase())
    );
    setTempPost(filteredResults);
    setQuery(newQuery);
  };
  return (
    <>
      <div>
        <div className="buttonContainer">
          <div>
            <input
              type="text"
              placeholder="Search for title and Desc"
              value={query}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleClick} name="tags">
            Add Tags
          </button>
          <button onClick={handleClick} name="post">
            Add Post
          </button>
          {tempPost && (
            <select onChange={handleSort}>
              <option value="novalue">Select Tags</option>
              {allTags.map((tag) => (
                <option value={tag.name}>{tag.name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="post-images">
          {tempPost.length > 0 &&
            tempPost.map(({ title, desc, tags, image }, index) => (
              <div key={index} className="singleImage">
                <h3>{title}</h3>
                <img
                  src={image}
                  alt={image}
                  style={{ width: "200px", height: "200px" }}
                />
                <p>{desc}</p>
                <p className="tagClass">
                  Tags :
                  {tags.map((tag) => (
                    <span className="post-tags">{`${tag}`}</span>
                  ))}
                </p>
              </div>
            ))}
        </div>
      </div>
      {popup.tags && <AddTags popup={popup} setPopup={setPopup} />}
      {popup.post && (
        <NewPostModal tagList={allTags} popup={popup} setPopup={setPopup} />
      )}
    </>
  );
};

export default Posts;
