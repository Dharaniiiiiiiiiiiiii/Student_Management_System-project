import React, { useState } from 'react';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [teacherView, setTeacherView] = useState("dashboard"); // new state

  const handleLogout = () => {
    setUser(null);
    setTeacherView("dashboard"); // reset view
  };

  return (
    <div className="app-container">
      {!user ? (
        <Login onLogin={setUser} />
      ) : user.role === 'teacher' ? (
        teacherView === "dashboard" ? (
          <TeacherDashboard
            user={user}
            onLogout={handleLogout}
            onViewStudents={() => setTeacherView("students")}
          />
        ) : (
          <StudentDashboard
            user={user}
            onLogout={handleLogout}
            onBack={() => setTeacherView("dashboard")}
          />
        )
      ) : user.role === 'student' ? (
        <StudentDashboard user={user} onLogout={handleLogout} />
      ) : (
        <ParentDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
