const express = require("express");
const router = express.Router();

const students = require("../data/students");

// GET /students - Get all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - Get student by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Student ID must be a number"
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.status(200).json(student);
});

// POST /students - Create a new student
router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      error: "Name and course are required"
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1,
    name: String(name).trim(),
    course: String(course).trim()
  };

  if (!newStudent.name || !newStudent.course) {
    return res.status(400).json({
      error: "Name and course cannot be empty"
    });
  }

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent
  });
});

// PUT /students/:id - Update a student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Student ID must be a number"
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      error: "Name and course are required"
    });
  }

  student.name = String(name).trim();
  student.course = String(course).trim();

  if (!student.name || !student.course) {
    return res.status(400).json({
      error: "Name and course cannot be empty"
    });
  }

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

// DELETE /students/:id - Delete a student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Student ID must be a number"
    });
  }

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

module.exports = router;