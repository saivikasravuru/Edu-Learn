const mongoose = require('mongoose');

// ── Connect to MongoDB ──
mongoose.connect('mongodb://localhost:27017/edulearnDB')
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ Error:', err));

// ── Student Schema ──
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  attendance: Number,
  courses: [
    {
      courseName: String,
      grade: String
    }
  ]
});

const Student = mongoose.model('students', StudentSchema);

// ════════════════════════════════════════
//   HELPER: Print students nicely
// ════════════════════════════════════════
const printStudents = (students, label) => {
  console.log('\n' + '='.repeat(60));
  console.log(`📋 ${label}`);
  console.log('='.repeat(60));
  if (students.length === 0) {
    console.log('  No students found.');
  } else {
    students.forEach((s, i) => {
      console.log(`\n  ${i + 1}. ${s.name}`);
      console.log(`     📧 Email      : ${s.email}`);
      console.log(`     📊 Attendance : ${s.attendance}%`);
      console.log(`     📚 Courses    :`);
      s.courses.forEach(c => {
        console.log(`        - ${c.courseName}: Grade ${c.grade}`);
      });
    });
  }
  console.log('='.repeat(60));
};

// ════════════════════════════════════════
//   a) UPDATE OPERATION
//   Increase attendance by 5% for students who:
//   - Completed at least 2 courses with grade A or B
//   - Attendance < 95%
// ════════════════════════════════════════
const updateOperation = async () => {
  console.log('\n\n🟡 ════════════════════════════════════════');
  console.log('   Ex 5a) UPDATE OPERATION');
  console.log('🟡 ════════════════════════════════════════');
  console.log('   Rule: Increase attendance by 5% for students');
  console.log('   who completed ≥2 courses with A or B grade');
  console.log('   AND have attendance < 95%');

  // Find qualifying students
  const allStudents = await Student.find({});

  const qualifying = allStudents.filter(student => {
    const goodGrades = student.courses.filter(
      c => c.grade === 'A' || c.grade === 'B'
    ).length;
    return goodGrades >= 2 && student.attendance < 95;
  });

  // ── BEFORE ──
  printStudents(qualifying, 'BEFORE UPDATE - Qualifying Students');

  // ── PERFORM UPDATE ──
  for (const student of qualifying) {
    const newAttendance = Math.min(student.attendance + 5, 100);
    await Student.updateOne(
      { _id: student._id },
      { $set: { attendance: newAttendance } }
    );
  }

  // ── AFTER ──
  const updatedStudents = await Student.find({
    _id: { $in: qualifying.map(s => s._id) }
  });

  printStudents(updatedStudents, 'AFTER UPDATE - Attendance Increased by 5%');
  console.log(`\n  ✅ Updated ${qualifying.length} students successfully!`);
};

// ════════════════════════════════════════
//   b) READ OPERATION
//   Find students who:
//   - Have at least one failed course (Grade = F)
//   - Attendance below 75%
// ════════════════════════════════════════
const readOperation = async () => {
  console.log('\n\n🔵 ════════════════════════════════════════');
  console.log('   Ex 5b) READ OPERATION');
  console.log('🔵 ════════════════════════════════════════');
  console.log('   Rule: Find students with at least 1 failed');
  console.log('   course (Grade F) AND attendance < 75%');

  const allStudents = await Student.find({});

  const result = allStudents.filter(student => {
    const hasFailed = student.courses.some(c => c.grade === 'F');
    return hasFailed && student.attendance < 75;
  });

  printStudents(result, 'READ RESULT - Students with F grade & Attendance < 75%');
  console.log(`\n  ✅ Found ${result.length} students matching criteria!`);
};

// ════════════════════════════════════════
//   c) DELETE OPERATION
//   Remove students who:
//   - Failed more than 1 course
//   - Attendance below 50%
// ════════════════════════════════════════
const deleteOperation = async () => {
  console.log('\n\n🔴 ════════════════════════════════════════');
  console.log('   Ex 5c) DELETE OPERATION');
  console.log('🔴 ════════════════════════════════════════');
  console.log('   Rule: Remove students who failed > 1 course');
  console.log('   AND attendance < 50%');

  const allStudents = await Student.find({});

  const toDelete = allStudents.filter(student => {
    const failCount = student.courses.filter(c => c.grade === 'F').length;
    return failCount > 1 && student.attendance < 50;
  });

  // ── BEFORE ──
  printStudents(toDelete, 'BEFORE DELETE - Students to be Removed');

  // ── PERFORM DELETE ──
  if (toDelete.length > 0) {
    await Student.deleteMany({
      _id: { $in: toDelete.map(s => s._id) }
    });
  }

  // ── AFTER ──
  const remaining = await Student.find({});
  printStudents(remaining, 'AFTER DELETE - Remaining Students');
  console.log(`\n  ✅ Deleted ${toDelete.length} students successfully!`);
};

// ════════════════════════════════════════
//   RUN ALL OPERATIONS
// ════════════════════════════════════════
const runAll = async () => {
  try {
    await updateOperation();
    await readOperation();
    await deleteOperation();

    console.log('\n\n✅ ════════════════════════════════════════');
    console.log('   ALL CRUD OPERATIONS COMPLETED!');
    console.log('✅ ════════════════════════════════════════\n');

    mongoose.connection.close();
  } catch (err) {
    console.log('❌ Error:', err.message);
    mongoose.connection.close();
  }
};

// Wait for connection then run
mongoose.connection.once('open', () => {
  runAll();
});