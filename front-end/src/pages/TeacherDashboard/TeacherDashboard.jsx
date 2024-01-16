// TeacherDashboard.js

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/teacher-dashboard/assignments">Assignments</Link>
          </li>
          <li>
            <Link to="/teacher-dashboard/students">Students</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TeacherDashboard;
