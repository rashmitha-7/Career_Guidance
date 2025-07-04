import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { id: posts.length + 1, content: newPost, comments: [] }]);
      setNewPost("");
    }
  };

  const handleCommentSubmit = (postId, comment) => {
    if (comment.trim() !== "") {
      setPosts(posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      ));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Discussion Forum</h2>
      <p className="text-center">Engage in discussions, share knowledge, and ask questions.</p>

      {/* Post Input */}
      <div className="card p-3 mb-4">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Start a discussion..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-2" onClick={handlePostSubmit}>
          Post
        </button>
      </div>

      {/* Display Posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="card p-3 mb-3">
            <p>{post.content}</p>
            <div className="mt-2">
              <h6>Comments:</h6>
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <p key={index} className="mb-1 ps-3 border-start border-3">{comment}</p>
                ))
              ) : (
                <p className="text-muted ps-3">No comments yet.</p>
              )}
              <CommentInput postId={post.id} onCommentSubmit={handleCommentSubmit} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No discussions yet. Be the first to post!</p>
      )}
    </div>
  );
}

// Comment Input Component
function CommentInput({ postId, onCommentSubmit }) {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (comment.trim() !== "") {
      onCommentSubmit(postId, comment);
      setComment("");
    }
  };

  return (
    <div className="mt-2">
      <input
        type="text"
        className="form-control"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-sm btn-secondary mt-1" onClick={submitComment}>
        Comment
      </button>
    </div>
  );
}

export default DiscussionForum;
