import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ExplorePrograms() {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Explore Skill Development Programs</h2>
      <p className="text-center">
        Enhance your skills with specialized training programs.
      </p>

      <div className="card p-4">
        <h4>Available Programs</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Full Stack Development
            <button className="btn btn-primary">Enroll</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Data Science & AI
            <button className="btn btn-primary">Enroll</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Cybersecurity Essentials
            <button className="btn btn-primary">Enroll</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ExplorePrograms;
