import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Home/Homepage'
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/student-dashboard" component={StudentDashboard} />
        <Route path="/teacher-dashboard" component={TeacherDashboard} />
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
};

export default App;

