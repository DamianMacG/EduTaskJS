// eslint-disable-next-line no-unused-vars
import React from 'react';
import './CreateAssignment.css';

const CreateAssignment = () => {
  return (
    <div>
      <h2>Create New Assignment</h2>
      <form>
        <label>
          Title:
          <input type="text" />
        </label>
        <br />
        <label>
          Description:
          <textarea />
        </label>
        <br />
        <label>
          Year:
          <select>
            <option value="">Select Year</option>
            <option value="12">Year 12</option>
            <option value="11">Year 11</option>
            <option value="10">Year 10</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignment;
