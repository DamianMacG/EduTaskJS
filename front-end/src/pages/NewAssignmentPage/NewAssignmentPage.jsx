
const NewAssignmentPage = () => {

  const subjects = ['English', 'Math', 'Science'];

  const handleCreateAssignment = () => {
    // Implement logic to create a new assignment
    alert('Assignment created!');
  };

  return (
    <div>
      <h2>Create New Assignment</h2>
      <form>
        <label>
          Title:
          <input type="text" />
        </label>
        <label>
          Topic:
          <select>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleCreateAssignment}>
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default NewAssignmentPage;
