// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';

import StudentsPage from './pages/StudentList/StudentList';
import AssignmentsList from './pages/AssignmentsList/AssignmentsList';
import NewAssignmentPage from './pages/NewAssignmentPage/NewAssignmentPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-dashboard/assignments" element={<AssignmentsList />} />
        <Route path="/teacher-dashboard/students" element={<StudentsPage />} />
        <Route path="/teacher-dashboard/assignments/new-assignment" element={<NewAssignmentPage />} />
   </Routes>
    </Router>
  );
};

export default App;


