import { useEffect, useState } from 'react';
import { getAssignmentsByTeacherId } from '../../utils/utils';

const AssignmentList = (id) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const fetchedAssignments = await getAssignmentsByTeacherId(id);
        setAssignments(fetchedAssignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [id]);

  return (
    <div>
      <h2>Assignments:</h2>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>{assignment.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;


