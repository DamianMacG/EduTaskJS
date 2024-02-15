
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div>
          <h2>Student Dashboard</h2>
          <nav>
            <ul>
              <li>
                <Link to="/student-dashboard/assignments">Assignments</Link>
              </li>
              <li>
                <Link to="/student-dashboard/forum">Forum</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
}
 
export default StudentDashboard;