import React, { useState, useEffect } from 'react';

// Child selector component
function ChildSelector({ children, activeIndex, onSelect }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <strong style={{ color: '#cfc8ff' }}>Your Children: </strong>
      {children.map((child, idx) => (
        <button
          key={child.id}
          onClick={() => onSelect(idx)}
          style={{
            marginRight: 10,
            padding: '8px 16px',
            backgroundColor: activeIndex === idx ? '#ad79e1' : '#5a479b',
            color: '#e4dbff',
            border: 'none',
            borderRadius: 12,
            boxShadow: activeIndex === idx ? '0 0 10px #ad79e1' : 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {child.firstName} {child.secondName}
        </button>
      ))}
    </div>
  );
}

// Tab navigation component
function TabNav({ activeTab, onChange }) {
  const tabs = ['info', 'marks', 'attendance', 'feedback'];
  return (
    <nav style={{ marginBottom: '1rem' }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            marginRight: 12,
            padding: '10px 18px',
            backgroundColor: activeTab === tab ? '#ad79e1' : '#5a479b',
            color: activeTab === tab ? '#e4dbff' : '#cfc8ff',
            border: 'none',
            borderRadius: 12,
            boxShadow: activeTab === tab ? '0 0 10px #ad79e1' : 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: 'Arial, sans-serif',
            textTransform: 'capitalize',
          }}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

// Info tab component
function InfoTab({ child }) {
  return (
    <div>
      <h2 style={{ color: '#cfc8ff', marginBottom: 20 }}>Student Info</h2>
      <p style={{ color: '#e4dbff', marginBottom: 8 }}><strong>Name:</strong> {child.firstName} {child.secondName}</p>
      <p style={{ color: '#e4dbff', marginBottom: 8 }}><strong>Email:</strong> {child.email}</p>
      <p style={{ color: '#e4dbff', marginBottom: 8 }}><strong>Age:</strong> {child.age}</p>
      <p style={{ color: '#e4dbff', marginBottom: 8 }}><strong>Date of Birth:</strong> {child.dob}</p>
    </div>
  );
}

// Marks tab component
function MarksTab({ child }) {
  return (
    <div>
      <h2 style={{ color: '#cfc8ff', marginBottom: 20 }}>Marks Details</h2>
      <ul style={{ color: '#e4dbff', listStyleType: 'none', paddingLeft: 0 }}>
        {Object.entries(child.marks).map(([subject, mark]) => (
          <li key={subject} style={{ marginBottom: 6 }}>
            <strong>{subject}:</strong> {mark}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Attendance tab component
function AttendanceTab({ child }) {
  return (
    <div>
      <h2 style={{ color: '#cfc8ff', marginBottom: 20 }}>Attendance Details</h2>
      {child.attendance.length === 0 ? (
        <p style={{ color: '#e4dbff' }}>No attendance records found.</p>
      ) : (
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            color: '#e4dbff',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#ad79e1' }}>
              <th style={{ padding: 10, border: '1px solid #6e5ca8' }}>Date</th>
              <th style={{ padding: 10, border: '1px solid #6e5ca8' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {child.attendance.map((record, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#5a479b' : '#6e5ca8',
                }}
              >
                <td style={{ padding: 10, border: '1px solid #6e5ca8' }}>{record.date}</td>
                <td style={{ padding: 10, border: '1px solid #6e5ca8' }}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Feedback tab component
function FeedbackTab({ child, feedbackInput, onFeedbackChange, onFeedbackSave }) {
  return (
    <div>
      <h2 style={{ color: '#cfc8ff', marginBottom: 20 }}>Feedback</h2>
      <textarea
        rows="5"
        value={feedbackInput}
        onChange={onFeedbackChange}
        placeholder="Enter feedback..."
        style={{
          width: '100%',
          padding: 12,
          borderRadius: 12,
          border: '1px solid #5a479b',
          backgroundColor: '#3f2e7f',
          color: '#e4dbff',
          fontFamily: 'Arial, sans-serif',
          fontSize: 14,
          boxShadow: '0 0 8px #ad79e1 inset',
          resize: 'vertical',
        }}
      />
      <button
        onClick={onFeedbackSave}
        style={{
          marginTop: 12,
          padding: '10px 20px',
          backgroundColor: '#ad79e1',
          border: 'none',
          borderRadius: 12,
          color: '#e4dbff',
          cursor: 'pointer',
          fontWeight: '600',
          boxShadow: '0 0 10px #ad79e1',
        }}
      >
        Save Feedback
      </button>
    </div>
  );
}

// Main ParentDashboard component
function ParentDashboard({ parentEmail, onLogout }) {
  const [children, setChildren] = useState([
    {
      id: 1,
      firstName: 'John',
      secondName: 'Doe',
      email: 'john@example.com',
      age: 15,
      dob: '2010-01-01',
      marks: { Math: 85, Science: 90, English: 88 },
      attendance: [
        { date: '2025-05-01', status: 'Present' },
        { date: '2025-05-02', status: 'Absent' }
      ],
      feedback: 'Doing well this semester.'
    },
    {
      id: 2,
      firstName: 'Jane',
      secondName: 'Doe',
      email: 'jane@example.com',
      age: 13,
      dob: '2012-03-15',
      marks: { Math: 92, Science: 87, English: 91 },
      attendance: [
        { date: '2025-05-01', status: 'Present' },
        { date: '2025-05-02', status: 'Present' }
      ],
      feedback: 'Needs improvement in Science.'
    }
  ]);

  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [feedbackInput, setFeedbackInput] = useState(children[0].feedback || '');

  useEffect(() => {
    setFeedbackInput(children[activeChildIndex].feedback || '');
    setActiveTab('info');
  }, [activeChildIndex, children]);

  const handleSelectChild = (index) => {
    setActiveChildIndex(index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFeedbackChange = (e) => {
    setFeedbackInput(e.target.value);
  };

  const handleFeedbackSave = () => {
    setChildren(prev =>
      prev.map((child, idx) =>
        idx === activeChildIndex ? { ...child, feedback: feedbackInput } : child
      )
    );
    alert('Feedback saved!');
  };

  const currentChild = children[activeChildIndex];

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#2c236b',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#cfc8ff' }}>Parent Dashboard</h1>

      <button
        onClick={onLogout}
        style={{
          float: 'right',
          marginBottom: 10,
          padding: '8px 16px',
          backgroundColor: '#ad79e1',
          color: '#e4dbff',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
          boxShadow: '0 0 10px #ad79e1',
          fontWeight: '600',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Logout
      </button>

      <ChildSelector
        children={children}
        activeIndex={activeChildIndex}
        onSelect={handleSelectChild}
      />

      <TabNav activeTab={activeTab} onChange={handleTabChange} />

      <div
        style={{
          backgroundColor: '#3f2e7f',
          padding: 20,
          borderRadius: 20,
          boxShadow: '0 0 20px #ad79e1',
          marginTop: 20,
          color: '#e4dbff',
          minHeight: 200,
        }}
      >
        {activeTab === 'info' && <InfoTab child={currentChild} />}
        {activeTab === 'marks' && <MarksTab child={currentChild} />}
        {activeTab === 'attendance' && <AttendanceTab child={currentChild} />}
        {activeTab === 'feedback' && (
          <FeedbackTab
            child={currentChild}
            feedbackInput={feedbackInput}
            onFeedbackChange={handleFeedbackChange}
            onFeedbackSave={handleFeedbackSave}
          />
        )}
      </div>
    </div>
  );
}

export default ParentDashboard;
