import React, { useState, useEffect } from 'react';

function StudentForm({ 
  onSave, 
  initialData, 
  isEditing, 
  onCancel 
}) {
  const [formData, setFormData] = useState({
    parentEmail: '',
    firstName: '',
    secondName: '',
    email: '',
    age: '',
    dob: '',
    attendance: [],
    marks: {},
    feedback: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        parentEmail: '',
        firstName: '',
        secondName: '',
        email: '',
        age: '',
        dob: '',
        attendance: [],
        marks: {},
        feedback: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation example
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    // Convert age to number
    const dataToSave = { ...formData, age: Number(formData.age) };

    onSave(dataToSave);

    if (!isEditing) {
      // Reset form only if adding new
      setFormData({
        parentEmail: '',
        firstName: '',
        secondName: '',
        email: '',
        age: '',
        dob: '',
        attendance: [],
        marks: {},
        feedback: ''
      });
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>

      <div className="form-row">
        <label>Parent Email:</label>
        <input
          type="email"
          name="parentEmail"
          value={formData.parentEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Second Name:</label>
        <input
          type="text"
          name="secondName"
          value={formData.secondName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Student Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="form-row">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-buttons" style={{ marginTop: '1rem' }}>
        <button type="submit" className="btn save-btn">
          {isEditing ? 'Update' : 'Add'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn cancel-btn"
            onClick={onCancel}
            style={{ marginLeft: '1rem' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
