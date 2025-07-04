import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CareerCounseling() {
  const [bookedSession, setBookedSession] = useState(null);

  const handleBooking = (session) => {
    setBookedSession(session);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Career Counseling</h2>
      <p className="text-center">
        Book a session with a career counselor to receive expert advice on job searches, skill development, and career paths.
      </p>

      <div className="card p-4">
        <h4>Available Sessions</h4>
        <ul className="list-group">
          {[
            { id: 1, title: "Resume Review", mentor: "John Doe" },
            { id: 2, title: "Interview Preparation", mentor: "Jane Smith" },
            { id: 3, title: "Career Planning", mentor: "Dr. Emily Clark" },
          ].map((session) => (
            <li key={session.id} className="list-group-item d-flex justify-content-between align-items-center">
              {session.title} - {session.mentor}
              <button className="btn btn-primary" onClick={() => handleBooking(session)}>
                Book Now
              </button>
            </li>
          ))}
        </ul>
      </div>

      {bookedSession && (
        <div className="alert alert-success mt-3" role="alert">
          You have successfully booked a <strong>{bookedSession.title}</strong> session with <strong>{bookedSession.mentor}</strong>!
        </div>
      )}
    </div>
  );
}

export default CareerCounseling;
