import React, { useState, useEffect } from "react";
import NewPostModal from "./AddPosts/AddPosts";
import AddTags from "./AddTags/AddTags";
import axios from "axios";
import "./style.css";
import ENV_VARS from "../utils/config";
import DisplayPosts from "./DisplayPosts";
const Posts = () => {
  const [popup, setPopup] = useState({
    tags: false,
    post: false,
  });
  const [allTags, setAllTags] = useState([]);
  const [postData, setPostData] = useState([]);
  const [query, setQuery] = useState("");
  let [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
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
          `${ENV_VARS.SERVER_URL}/api/tags/getAllTags`
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
        `${ENV_VARS.SERVER_URL}/api/posts/getAllPosts?page=${page}&limit=3`
      );
      const { posts, currentPage, totalPages } = response.data;
      if (posts.length > 0) {
        setPostData(posts);
      }
      if (currentPage && totalPages) {
        setPage(currentPage);
        setTotalPage(totalPages);
      }
    };
    getAllTags();
    getAllImages();
  }, [popup]);
  const handleSort = async (e) => {
    const selectedTag = e.target.value;
    if (selectedTag) {
      try {
        let response;
        if (selectedTag === "novalue") {
          response = await axios.get(
            `${ENV_VARS.SERVER_URL}/api/posts/getAllPosts?page=${page}&limit=3`
          );
        } else {
          response = await axios.get(
            `${ENV_VARS.SERVER_URL}/api/posts/getpostbyid/${selectedTag}`
          );
        }
        const { posts } = response.data;
        if (posts) {
          setPostData(posts);
        }
      } catch (error) {
        setPostData([]);
      }
    }
  };
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    const filteredResults = postData.filter(
      (item) =>
        item.title.toLowerCase().includes(newQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(newQuery.toLowerCase())
    );
    setPostData(filteredResults);
    setQuery(newQuery);
  };
  const handleCountBtn = async (e) => {
    const btn = e.target.name;
    if (btn === "prev") {
      if (page !== 1) {
        setPage(--page);
      }
    } else if (btn === "next") {
      if (page !== totalPage) {
        setPage(++page);
      }
    }
    try {
      const response = await axios.get(
        `${ENV_VARS.SERVER_URL}/api/posts/getAllPosts?page=${page}&limit=3`
      );

      const { posts, currentPage, totalPages } = response.data;
      if (currentPage && totalPages) {
        setPage(currentPage);
        setTotalPage(totalPages);
      }
      if (posts) {
        setPostData(posts);
      }
    } catch (error) {
      setPostData([]);
    }
  };
  return (
    <>
      <div>
        <div className="buttonContainer">
          <div className="searchBarContainer">
            <input
              type="text"
              placeholder="Search for title and Desc"
              value={query}
              onChange={handleInputChange}
            />
          </div>
          {postData && (
            <select onChange={handleSort} className="optionSelector">
              <option value="novalue">Select Tags</option>
              {allTags.map((tag) => (
                <option value={tag._id}>{tag.name}</option>
              ))}
            </select>
          )}
          <button onClick={handleClick} name="tags">
            Add Tags
          </button>
          <button onClick={handleClick} name="post">
            Add Post
          </button>
        </div>
        {postData.length > 0 ? (
          <>
            <DisplayPosts
              postData={postData}
              handleCountBtn={handleCountBtn}
              page={page}
              totalPage={totalPage}
            />
          </>
        ) : (
          <div className="defaultText">No Post Available</div>
        )}
      </div>
      {popup.tags && <AddTags popup={popup} setPopup={setPopup} />}
      {popup.post && (
        <NewPostModal tagList={allTags} popup={popup} setPopup={setPopup} />
      )}
    </>
  );
};

export default Posts;
