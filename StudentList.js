import React from 'react';

function StudentList({ students, canEdit, onEdit, onDelete }) {
  return (
    <div className="student-list-card">
      <h3 className="student-list-title">Student List</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>  
            <th>Grade</th>
            <th>Email</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={canEdit ? 5 : 4} style={{ textAlign: 'center', padding: '20px', color: '#ccc' }}>
                No students available.
              </td>
            </tr>
          )}
          {students.map((student, index) => (
            <tr key={index} className="student-row">
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>{student.email}</td>
              {canEdit && (
                <td className="actions-cell">
                  <button className="btn edit-btn" onClick={() => onEdit(index)}>Edit</button>
                  <button className="btn delete-btn" onClick={() => onDelete(index)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
