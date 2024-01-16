// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to EduTaskHub</h1>
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
