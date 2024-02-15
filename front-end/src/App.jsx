// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import StudentsPage from './pages/StudentList/StudentList';
import AssignmentsList from './pages/AssignmentsList/AssignmentsList';
import CreateAssignment from './pages/CreateAssignment/CreateAssignment';
import StudentForum from './pages/StudentForum/StudentForum';
import StudentAssignments from './pages/StudentAssignments/StudentAssignments';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-dashboard/forum" element={<StudentForum />} />
        <Route path="/student-dashboard/assignments" element={<StudentAssignments />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-dashboard/assignments" element={<AssignmentsList />} />
        <Route path="/teacher-dashboard/students" element={<StudentsPage />} />
        <Route path="/teacher-dashboard/assignments/new-assignment" element={<CreateAssignment />} />
        
   </Routes>
    </Router>
  );
};

export default App;


