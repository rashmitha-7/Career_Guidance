import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CareerHigher = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Higher Career Options</h1>
      <p className="text-center text-muted">
        Higher education plays a crucial role in shaping your professional future. Explore specialized degrees,
        certifications, and industry-specific training to enhance your career prospects.
      </p>

      {/* Career Paths Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <img src="/higher-career.jpg" alt="Higher Career" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Explore Your Path</h3>
          <p>
            Choosing the right higher education option depends on your interests and career goals. Here are some 
            major fields and their professional opportunities:
          </p>
          <ul>
            <li><strong>Engineering & Technology:</strong> B.Tech, M.Tech, AI, Data Science, Robotics, Cybersecurity</li>
            <li><strong>Medical & Health Sciences:</strong> MBBS, Nursing, Pharmacy, Biotechnology, Public Health</li>
            <li><strong>Management & Business:</strong> MBA, Finance, HR, Marketing, Entrepreneurship</li>
            <li><strong>Creative Arts & Design:</strong> Fashion Designing, Graphic Designing, UI/UX, Animation</li>
            <li><strong>Government & Civil Services:</strong> UPSC, Banking, SSC, Defense Services</li>
            <li><strong>Law & Legal Studies:</strong> LLB, Corporate Law, Cyber Law</li>
            <li><strong>Education & Teaching:</strong> B.Ed, M.Ed, Special Education, EdTech</li>
            <li><strong>Hospitality & Tourism:</strong> Hotel Management, Aviation, Travel Consulting</li>
          </ul>
          <Link to="/mentors" className="btn btn-primary mt-3">Connect with Mentors</Link>
        </div>
      </div>

      {/* Certification Section */}
      <div className="mt-5 p-4 bg-white rounded shadow">
        <h2 className="fw-bold">Certifications & Skill-Based Learning</h2>
        <p className="text-muted">
          In addition to degree programs, acquiring industry-recognized certifications can boost your job 
          prospects and skillset. Some popular certifications include:
        </p>
        <ul>
          <li><strong>Technology:</strong> AWS Certified Solutions Architect, Google Cloud, Python, Ethical Hacking</li>
          <li><strong>Business & Finance:</strong> CFA, CPA, Financial Risk Manager (FRM), Digital Marketing</li>
          <li><strong>Healthcare:</strong> Certified Nursing Assistant (CNA), Medical Coding, Nutritionist</li>
          <li><strong>Creative Arts:</strong> Adobe Certification, Video Editing, Interior Design</li>
        </ul>
        <Link to="/certifications" className="btn btn-dark">Explore Certifications</Link>
      </div>

      {/* Resources & Future Trends Section */}
      <div className="mt-5 p-4 bg-light rounded">
        <h2 className="fw-bold">Resources & Future Trends</h2>
        <p className="text-muted">
          Stay ahead with the latest trends in education and industry. Explore career guidance, 
          online learning platforms, and industry reports to make informed career decisions.
        </p>
        <ul>
          <li>🔹 <strong>Career Guidance Portals:</strong> Coursera, edX, Udemy, LinkedIn Learning</li>
          <li>🔹 <strong>Industry Trends:</strong> AI & Automation, Green Energy Careers, Remote Work Opportunities</li>
          <li>🔹 <strong>Scholarships & Financial Aid:</strong> National & International Scholarship Programs</li>
        </ul>
        <Link to="/discover-more" className="btn btn-outline-primary">Discover More</Link>
      </div>
    </div>
  );
};

export default CareerHigher;
