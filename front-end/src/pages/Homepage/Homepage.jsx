// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to EduTask</h1>
      <Link to="/student-dashboard">
        <button>Student Login</button>
      </Link>
      <Link to="/teacher-dashboard">
        <button>Teacher Login</button>
      </Link>
    </div>
  );
};

export default Homepage;
