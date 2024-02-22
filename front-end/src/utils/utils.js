const BASE_URL = "http://localhost:8080";

export const getAssignmentsByTeacherId = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/teachers/${id}/assignments`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const assignments = await response.json();
    console.log(assignments.assignments);
    return assignments.assignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};


