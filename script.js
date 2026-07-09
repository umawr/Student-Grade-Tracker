'use strict';

const students = [];

const studentList = document.querySelector('.studentList');
const searchBar = document.querySelector('.searchBar');
const totalStudentsValue = document.getElementById('totalStudentsValue');
const classAverageValue = document.getElementById('classAverageValue');
const highestScoreValue = document.getElementById('highestScoreValue');
const passingRateValue = document.getElementById('passingRateValue');
const filterSelect = document.querySelector('.filterSelect');

const getGrade = function (score) {
  if (score >= 90) return 'A';
  else if (score >= 80) return 'B';
  else if (score >= 70) return 'C';
  else if (score >= 60) return 'D';
  else return 'F';
};

const render = function () {
  const searchTerm = searchBar.value.toLowerCase();
  const selectedGrade = filterSelect.value;

  const filteredStudents = students.filter(function (student) {
    const matchesName = student.name.toLowerCase().includes(searchTerm);
    const matchesGrade =
      selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesName && matchesGrade;
  });

  studentList.innerHTML = '';

  filteredStudents.forEach(function (student, index) {
    const row = document.createElement('tr');
    row.className = 'studentRow';
    row.innerHTML = `
      <td class="serialNumber">${index + 1}</td>
      <td class="names">${student.name}</td>
      <td class="scores">${student.score}</td>
      <td class="grades">${student.grade}</td>
      <td class="action"><button class="deleteBtn" data-index="${index}">🗑️</button></td>
    `;
    studentList.appendChild(row);
  });
};

const updateOverview = function () {
  const total = students.length;

  const average =
    total === 0
      ? 0
      : students.reduce(function (sum, student) {
          return sum + student.score;
        }, 0) / total;

  const highest =
    total === 0
      ? 0
      : Math.max(
          ...students.map(function (student) {
            return student.score;
          }),
        );

  const passingCount = students.filter(function (student) {
    return student.score >= 60;
  }).length;

  const passingRate = total === 0 ? 0 : (passingCount / total) * 100;

  totalStudentsValue.textContent = total;
  classAverageValue.textContent = average.toFixed(0) + '%';
  highestScoreValue.textContent = highest;
  passingRateValue.textContent = passingRate.toFixed(0) + '%';
};

addStudentBtn.addEventListener('click', function () {
  const name = document.getElementById('studentName').value;
  const score = Number(document.getElementById('studentScore').value);
  const grade = getGrade(score);

  const student = { name, score, grade };

  students.push(student);

  document.getElementById('studentName').value = '';
  document.getElementById('studentScore').value = '';

  render();
  updateOverview();
});

studentList.addEventListener('click', function (e) {
  if (e.target.classList.contains('deleteBtn')) {
    const index = Number(e.target.dataset.index);
    students.splice(index, 1);
    render();
    updateOverview();
  }
});

searchBar.addEventListener('input', render);
filterSelect.addEventListener('change', render);

render();
updateOverview();
