import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const JoinForum = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "Alice", topic: "AI in Healthcare", content: "How is AI transforming medical diagnosis?" },
    { id: 2, user: "Bob", topic: "Web Development", content: "What are the best frontend frameworks?" },
    { id: 3, user: "Charlie", topic: "Cybersecurity", content: "How do I secure my website from hackers?" }
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      const newEntry = { id: posts.length + 1, user: "You", topic: "General", content: newPost };
      setPosts([...posts, newEntry]);
      setNewPost("");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Discussion Forums</h2>
      <p className="text-center text-muted">Engage in discussions and seek advice from professionals.</p>
      
      <div className="card p-3 mb-3">
        <h4>Join the Conversation</h4>
        <textarea 
          className="form-control mb-2" 
          placeholder="Share your thoughts..." 
          value={newPost} 
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button className="btn btn-primary" onClick={handlePostSubmit}>Post</button>
      </div>
      
      <div className="list-group">
        {posts.map(post => (
          <div key={post.id} className="list-group-item">
            <h5>{post.topic}</h5>
            <p><strong>{post.user}:</strong> {post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinForum;
