import React, { useState } from 'react';
import StudentForm from './StudentForm';
import AttendanceTracker from './AttendanceTracker';

function TeacherDashboard({ user, onLogout }) {
  const [students, setStudents] = useState([
    {
      parentEmail: 'parent@example.com',
      firstName: 'John',
      secondName: 'Doe',
      email: 'john@example.com',
      age: 15,
      dob: '2010-01-01',
      attendance: [],
      marks: { Math: 0, Science: 0, English: 0 },
      feedback: ''
    }
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQueryList, setSearchQueryList] = useState('');
  const [searchQueryMarks, setSearchQueryMarks] = useState('');
  const [tempMarks, setTempMarks] = useState({});

  const handleSave = (studentData) => {
    if (editingIndex !== null) {
      setStudents((prev) =>
        prev.map((s, i) => (i === editingIndex ? studentData : s))
      );
      setEditingIndex(null);
      setActiveTab('list');
    } else {
      setStudents((prev) => [...prev, studentData]);
      setActiveTab('list');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setActiveTab('form');
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setActiveTab('list');
  };

  const handleMarksChange = (email, subject, value) => {
    setTempMarks((prev) => {
      const studentMarks = prev[email] || {};
      return {
        ...prev,
        [email]: {
          ...studentMarks,
          [subject]: Number(value),
        },
      };
    });
  };

  const handleSaveMarks = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (tempMarks[student.email]) {
          return {
            ...student,
            marks: {
              ...student.marks,
              ...tempMarks[student.email],
            },
          };
        }
        return student;
      })
    );
    setTempMarks({});
    alert('Marks saved!');
  };

  const filterStudents = (studentsArray, query) => {
    if (!query.trim()) return studentsArray;
    const lower = query.toLowerCase();
    return studentsArray.filter((s) =>
      s.firstName.toLowerCase().includes(lower) ||
      s.secondName.toLowerCase().includes(lower) ||
      s.email.toLowerCase().includes(lower)
    );
  };

  const filteredListStudents = filterStudents(students, searchQueryList);
  const filteredMarksStudents = filterStudents(students, searchQueryMarks);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Teacher Dashboard</h1>
      <button
        onClick={onLogout}
        style={{ float: 'right', marginBottom: '10px', padding: '6px 12px' }}
      >
        Logout
      </button>

      <nav style={{ marginBottom: '1rem', clear: 'both' }}>
        <button onClick={() => setActiveTab('form')} disabled={activeTab === 'form'}>
          Student Form
        </button>
        <button onClick={() => setActiveTab('attendance')} disabled={activeTab === 'attendance'}>
          Attendance
        </button>
        <button onClick={() => setActiveTab('list')} disabled={activeTab === 'list'}>
          Student List
        </button>
        <button onClick={() => setActiveTab('marks')} disabled={activeTab === 'marks'}>
          Marks Entry
        </button>
        {activeTab === 'studentView' && (
          <button disabled>Student View</button>
        )}
      </nav>

      {activeTab === 'form' && (
        <StudentForm
          onSave={handleSave}
          initialData={editingIndex !== null ? students[editingIndex] : null}
          isEditing={editingIndex !== null}
          onCancel={handleCancelEdit}
          students={students}
          setStudents={setStudents}
        />
      )}

      {activeTab === 'attendance' && (
        <AttendanceTracker
          students={students}
          onMark={(index, record) => {
            const updated = students.map((student, i) =>
              i === index
                ? { ...student, attendance: [...(student.attendance || []), record] }
                : student
            );
            setStudents(updated);
          }}
        />
      )}

      {activeTab === 'list' && (
        <>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQueryList}
            onChange={(e) => setSearchQueryList(e.target.value)}
            style={{ marginBottom: '10px', padding: '6px', width: '300px' }}
          />
          <table border="1" cellPadding="6" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredListStudents.map((student, index) => (
                <tr key={student.email}>
                  <td>{student.firstName}</td>
                  <td>{student.secondName}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.dob}</td>
                  <td>
                    <button
                      style={{ fontSize: '0.7rem', padding: '4px 8px', marginRight: '4px' }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ fontSize: '0.7rem', padding: '4px 8px', marginRight: '4px', backgroundColor: '#ff4d4f', color: 'white' }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                      onClick={() => {
                        setSelectedStudent(student);
                        setActiveTab('studentView');
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredListStudents.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {activeTab === 'marks' && (
        <>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQueryMarks}
            onChange={(e) => setSearchQueryMarks(e.target.value)}
            style={{ marginBottom: '10px', padding: '6px', width: '300px' }}
          />
          <div>
            <h2>Marks Entry</h2>
            {filteredMarksStudents.length === 0 && <p>No students available.</p>}
            {filteredMarksStudents.map((student) => (
              <div key={student.email} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h3>{student.firstName} {student.secondName}</h3>
                {['Math', 'Science', 'English'].map((subject) => (
                  <label key={subject} style={{ marginRight: '15px' }}>
                    {subject}:{' '}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={
                        tempMarks[student.email]?.[subject] !== undefined
                          ? tempMarks[student.email][subject]
                          : student.marks[subject] || 0
                      }
                      onChange={(e) => handleMarksChange(student.email, subject, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            ))}
            {filteredMarksStudents.length > 0 && (
              <button onClick={handleSaveMarks} style={{ padding: '8px 16px', marginTop: '10px' }}>
                Save Marks
              </button>
            )}
          </div>
        </>
      )}

      {activeTab === 'studentView' && selectedStudent && (
        <div style={{ marginTop: '20px' }}>
          <h2>Student Details</h2>
          <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.secondName}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Age:</strong> {selectedStudent.age}</p>
          <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
          <p><strong>Marks:</strong></p>
          <ul>
            {Object.entries(selectedStudent.marks).map(([subject, mark]) => (
              <li key={subject}>{subject}: {mark}</li>
            ))}
          </ul>
          <p><strong>Attendance Records:</strong> {selectedStudent.attendance.length} entries</p>
          <button onClick={() => setActiveTab('list')} style={{ marginTop: '10px' }}>
            Back to List
          </button>
        </div>
      )}
    </div>
  );
}
export default TeacherDashboard;
