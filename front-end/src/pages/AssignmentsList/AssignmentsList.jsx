import { Link } from 'react-router-dom';

const AssignmentsList = () => {

  const assignments = [
    { id: 1, title: 'English Assignment 1', topic: 'Literature' },
    { id: 2, title: 'English Assignment 2', topic: 'Grammar' },

  ];

  return (
    <div>
      <h2>All Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <a href={`/assignments/${assignment.id}`}>{assignment.title}</a> - {assignment.topic}
          </li>
        ))}
      </ul>
       <Link to="/teacher-dashboard/assignments/new-assignment">
        <button>Create New Assignment</button>
      </Link>
    </div>
  );
};

export default AssignmentsList;
