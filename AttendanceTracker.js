import React, { useState } from 'react';

function AttendanceTracker({ students, onMark }) {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [statusMap, setStatusMap] = useState({}); // { studentEmail: 'Present' | 'Absent' | '' }

  const handleStatusChange = (email, status) => {
    setStatusMap((prev) => ({ ...prev, [email]: status }));
  };

  const handleSubmit = () => {
    for (const student of students) {
      const status = statusMap[student.email];
      if (status) {
        onMark(students.indexOf(student), {
          date: selectedDate,
          status,
          remarks: '',
        });
      }
    }
    alert('Attendance marked for ' + selectedDate);
    setStatusMap({});
  };

  return (
    <div>
      <h2>Attendance Tracker</h2>
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ marginLeft: '10px', marginBottom: '10px' }}
        />
      </label>
      <table
        border="1"
        cellPadding="6"
        cellSpacing="0"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ firstName, secondName, email }) => (
            <tr key={email}>
              <td>{firstName} {secondName}</td>
              <td>
                <input
                  type="radio"
                  name={`attendance-${email}`}
                  checked={statusMap[email] === 'Present'}
                  onChange={() => handleStatusChange(email, 'Present')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`attendance-${email}`}
                  checked={statusMap[email] === 'Absent'}
                  onChange={() => handleStatusChange(email, 'Absent')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '8px 16px' }}>
        Save Attendance
      </button>
    </div>
  );
}

export default AttendanceTracker;
