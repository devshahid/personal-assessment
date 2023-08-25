import React from "react";

const DisplayPosts = ({ postData, handleCountBtn, page, totalPage }) => {
  return (
    <div>
      <div className="post-images">
        {postData.length > 0 &&
          postData.map(({ title, desc, tags, image }, index) => (
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
      <div className="pagination">
        <button onClick={handleCountBtn} name="prev">
          Prev
        </button>
        <div className="pagination-number">
          <div>Current Page : {page}</div>
          <div>Total Page : {totalPage}</div>
        </div>
        <button onClick={handleCountBtn} name="next">
          Next
        </button>
      </div>
    </div>
  );
};

export default DisplayPosts;
