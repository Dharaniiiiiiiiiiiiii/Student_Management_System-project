import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function Dashboard({ user, onLogout }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  // Save students to localStorage on change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addOrUpdateStudent = (student) => {
    if (editingIndex !== -1) {
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = student;
      setStudents(updatedStudents);
      setEditingIndex(-1);
    } else {
      setStudents([...students, student]);
    }
  };

  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📘 Welcome, {user.username}</h1>
        <button className="btn logout-btn" onClick={onLogout}>Logout</button>
      </header>

      {user.role === 'teacher' && (
        <StudentForm
          onSave={addOrUpdateStudent}
          initialData={editingIndex !== -1 ? students[editingIndex] : null}
          isEditing={editingIndex !== -1}
          onCancel={() => setEditingIndex(-1)}
        />
      )}

      <StudentList
        students={students}
        canEdit={user.role === 'teacher'}
        onEdit={setEditingIndex}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default Dashboard;
