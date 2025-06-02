import React, { useState, useEffect } from 'react';

function StudentDashboard({ user, onLogout }) {
  // Initial dummy data - Can be replaced with backend fetch using user.email
  const [student, setStudent] = useState({
    parentEmail: 'parent@example.com',
    firstName: 'John',
    secondName: 'Doe',
    email: 'john@example.com',
    age: 15,
    dob: '2010-01-01',
    attendance: [
      { date: '2025-05-01', status: 'Present', remarks: '' },
      { date: '2025-05-02', status: 'Absent', remarks: 'Sick' },
    ],
    marks: {
      Math: 85,
      Science: 90,
      English: 88,
    },
    feedback: 'Keep up the good work!',
    notes: ['Need to improve handwriting.'],
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    parentEmail: '',
    firstName: '',
    secondName: '',
    email: '',
    age: '',
    dob: '',
  });
  const [newNote, setNewNote] = useState('');

  // Load student data into profile form on mount or when student updates
  useEffect(() => {
    if (student) {
      setProfileForm({
        parentEmail: student.parentEmail || '',
        firstName: student.firstName || '',
        secondName: student.secondName || '',
        email: student.email || '',
        age: student.age || '',
        dob: student.dob || '',
      });
    }
  }, [student]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setStudent((prev) => ({ ...prev, ...profileForm }));
    alert('Profile updated!');
  };

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    setStudent((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote.trim()],
    }));
    setNewNote('');
  };

  const presentCount = student.attendance.filter((a) => a.status === 'Present').length;
  const totalAttendance = student.attendance.length;
  const attendancePercent = totalAttendance
    ? ((presentCount / totalAttendance) * 100).toFixed(1)
    : 0;

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Student Dashboard</h1>
      <button
        onClick={onLogout}
        style={{ float: 'right', marginBottom: '10px', padding: '6px 12px' }}
      >
        Logout
      </button>

      <nav style={{ marginBottom: '1rem', clear: 'both' }}>
        <button onClick={() => setActiveTab('profile')} disabled={activeTab === 'profile'}>
          Profile
        </button>
        <button onClick={() => setActiveTab('attendance')} disabled={activeTab === 'attendance'}>
          Attendance
        </button>
        <button onClick={() => setActiveTab('marks')} disabled={activeTab === 'marks'}>
          Marks & Feedback
        </button>
        <button onClick={() => setActiveTab('notes')} disabled={activeTab === 'notes'}>
          Notes
        </button>
      </nav>

      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} style={{ maxWidth: '400px' }}>
          <label>
            Parent Email:
            <input
              type="email"
              name="parentEmail"
              value={profileForm.parentEmail}
              onChange={handleProfileChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={profileForm.firstName}
              onChange={handleProfileChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </label>
          <label>
            Second Name:
            <input
              type="text"
              name="secondName"
              value={profileForm.secondName}
              onChange={handleProfileChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={profileForm.age}
              onChange={handleProfileChange}
              required
              min="5"
              max="20"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={profileForm.dob}
              onChange={handleProfileChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </label>
          <button type="submit" style={{ padding: '8px 16px' }}>
            Update Profile
          </button>
        </form>
      )}

      {activeTab === 'attendance' && (
        <div>
          <h2>Attendance Records</h2>
          <p>
            Present: {presentCount} / {totalAttendance} ({attendancePercent}%)
          </p>
          <table
            border="1"
            cellPadding="6"
            cellSpacing="0"
            style={{ width: '100%', borderCollapse: 'collapse' }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {student.attendance.map(({ date, status, remarks }, idx) => (
                <tr key={idx}>
                  <td>{date}</td>
                  <td>{status}</td>
                  <td>{remarks}</td>
                </tr>
              ))}
              {student.attendance.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>
                    No attendance records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'marks' && (
        <div>
          <h2>Marks & Feedback</h2>
          <table
            border="1"
            cellPadding="6"
            cellSpacing="0"
            style={{ width: '100%', maxWidth: '400px', borderCollapse: 'collapse' }}
          >
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {['Math', 'Science', 'English'].map((subject) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>{student.marks?.[subject] ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Teacher Feedback</h3>
          <p>{student.feedback || 'No feedback yet.'}</p>
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          <h2>Personal Notes</h2>
          <ul>
            {student.notes?.map((note, idx) => (
              <li key={idx}>{note}</li>
            )) || <li>No notes added.</li>}
          </ul>
          <textarea
            placeholder="Add a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
            style={{ width: '100%', marginTop: '10px' }}
          />
          <button onClick={handleAddNote} style={{ marginTop: '8px', padding: '6px 12px' }}>
            Add Note
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
