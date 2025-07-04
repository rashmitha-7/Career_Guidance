import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Resume Generated! (Feature to be implemented)");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Build Your Resume</h2>
      <p className="text-center">Fill in your details to generate a professional resume.</p>

      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Education</label>
            <textarea className="form-control" name="education" value={formData.education} onChange={handleChange} required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Work Experience</label>
            <textarea className="form-control" name="experience" value={formData.experience} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Skills</label>
            <input type="text" className="form-control" name="skills" value={formData.skills} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-success w-100">Generate Resume</button>
        </form>
      </div>
    </div>
  );
}

export default ResumeBuilder;
