from flask import Flask, request, jsonify
from flask_cors import CORS
from model import db, Student, Teacher, Parent

app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create DB Tables
@app.before_first_request
def create_tables():
    db.create_all()

# Add Student
@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    student = Student(
        name=data['name'],
        email=data['email'],
        parent_email=data['parent_email']
    )
    db.session.add(student)
    db.session.commit()
    return jsonify({'message': 'Student added successfully'}), 201

# Get All Students (for Teacher view)
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'email': s.email,
        'parent_email': s.parent_email,
        'attendance': s.attendance
    } for s in students])

# Filter student by email (for Student Dashboard)
@app.route('/student/<email>', methods=['GET'])
def get_student_by_email(email):
    student = Student.query.filter_by(email=email).first()
    if student:
        return jsonify({
            'id': student.id,
            'name': student.name,
            'email': student.email,
            'parent_email': student.parent_email,
            'attendance': student.attendance
        })
    return jsonify({'message': 'Student not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
