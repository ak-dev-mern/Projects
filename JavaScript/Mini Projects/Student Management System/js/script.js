let students = [];
const btnAdd = document.getElementById("btnAdd");
const btnUpdate = document.getElementById("btnUpdate");
const btnClear = document.getElementById("btnClear");
const nameElement = document.getElementById("name");
const maleElement = document.getElementById("male");
const rollnoElement = document.getElementById("rollno");
const englishElement = document.getElementById("english");
const mathsElement = document.getElementById("maths");
const scienceElement = document.getElementById("science");
const socialElement = document.getElementById("social");
const tamilElement = document.getElementById("tamil");

const midElement = document.getElementById("mid");
const mnameElement = document.getElementById("mname");
const mmaleElement = document.getElementById("mmale");
const mfemaleElement = document.getElementById("mfemale");
const mrollnoElement = document.getElementById("mrollno");
const menglishElement = document.getElementById("menglish");
const mmathsElement = document.getElementById("mmaths");
const mscienceElement = document.getElementById("mscience");
const msocialElement = document.getElementById("msocial");
const mtamilElement = document.getElementById("mtamil");

const searchTxtElement = document.getElementById("searchTxt");
const tbody = document.querySelector("#mainBody");

function total(student) {
  return (student =
    student.english +
    student.maths +
    student.science +
    student.social +
    student.tamil);
}

function calculateAcadamic(student) {
  const data = {};
  data.total = total(student);
  data.average = data.total / 5;
  data.result =
    student.english >= 35 &&
    student.maths >= 35 &&
    student.science >= 35 &&
    student.social >= 35 &&
    student.tamil >= 35
      ? "Pass"
      : "Fail";

  if (data.result == "Pass") {
    if (data.average >= 90 && data.average <= 100) {
      data.grade = "A Grade";
    } else if (data.average >= 80 && data.average <= 90) {
      data.grade = "B Grade";
    } else if (data.average >= 70 && data.average <= 79) {
      data.grade = "C Grade";
    } else {
      data.grade = "D Grade";
    }
  } else {
    data.grade = "-";
  }
  return data;
}

function loadStudentData(initial = false) {
  tbody.innerHTML = "";
  students = students.map((student, index) => {
    const data = calculateAcadamic(student);
    tbody.innerHTML += `<tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.gender}</td>
        <td>${student.rollno}</td>
        <td class="${student.english < 35 ? "fail" : ""}">${
      student.english
    }</td>
        <td class="${student.maths < 35 ? "fail" : ""}">${student.maths}</td>
        <td class="${student.science < 35 ? "fail" : ""}">${
      student.science
    }</td>
        <td class="${student.social < 35 ? "fail" : ""}">${student.social}</td>
        <td class="${student.tamil < 35 ? "fail" : ""}">${student.tamil}</td>
        <td>${data.total}</td>
        <td>${data.average.toFixed(2)}%</td>
        <td>${data.result}</td>
        <td>${data.grade}</td>
         <td><button data-id='${
           student.id
         }' class="btn btn-primary btnEdit btn-sm">Edit</button></td>
         <td><button data-id='${
           student.id
         }' class="btn btn-danger btnDelete btn-sm">Delete</button></td>
        </tr>`;

    return {
      ...student,
      total: data.total,
      average: data.average,
      result: data.result,
      grade: data.grade,
    };
  });

  const btnEdit = document.querySelectorAll(".btnEdit");
  btnEdit.forEach((btn) => {
    btn.addEventListener("click", editStudent);
  });

  const btnDelete = document.querySelectorAll(".btnDelete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", deleteStudent);
  });
  if (initial == false) saveStudentsLocalStorage();
}

const myModalEl = document.getElementById("myModal");
const myModal = new bootstrap.Modal(myModalEl, {});

function editStudent(e) {
  const id = e.target.dataset.id;

  const student = students.filter((student) => student.id == id)[0];

  mnameElement.value = student.name.trim();
  student.gender == "Male"
    ? (mmaleElement.checked = true)
    : (mfemaleElement.checked = true);
  mrollnoElement.value = student.rollno.trim();
  menglishElement.value = student.english;
  mmathsElement.value = student.maths;
  mscienceElement.value = student.science;
  msocialElement.value = student.social;
  mtamilElement.value = student.tamil;
  midElement.value = id;
  myModal.show();
}

function deleteStudent(e) {
  const id = e.target.dataset.id;
  if (confirm("Are You sure to delete ?")) {
    students = students.filter((student) => student.id != id);
    loadStudentData();
    top3Students();
    genderwise();
    subjectwise();
  }
}

// Modal Update Form - Validate //

function setModalError(element, message) {
  const inputGroupModal = element.parentElement;
  const errorElementModal = document.querySelector(".merror");

  errorElementModal.innerText = message;
  inputGroupModal.classList.add("merror");
  inputGroupModal.classList.remove("msuccess");
}

function setModalSuccess(element) {
  const inputGroupModal = element.parentElement;
  const errorElementModal = document.querySelector(".merror");

  errorElementModal.innerText = "";
  inputGroupModal.classList.add("msuccess");
  inputGroupModal.classList.remove("merror");
}

btnUpdate.addEventListener("click", function () {
  const name = mnameElement.value;
  const gender = mmaleElement.checked ? "Male" : "Female";
  const rollno = mrollnoElement.value;
  const english = Number(menglishElement.value);
  const maths = Number(mmathsElement.value);
  const science = Number(mscienceElement.value);
  const social = Number(msocialElement.value);
  const tamil = Number(mtamilElement.value);
  const id = midElement.value;

  if (name == "") {
    setModalError(mnameElement, "Name is required");
    mnameElement.value = "";
    mnameElement.focus();
    success = false;
    return;
  } else {
    setModalSuccess(mnameElement);
  }

  // if (rollno == 0) {
  //   setModalError(mrollnoElement, "Roll No is required");
  //   mrollnoElement.value = "";
  //   mrollnoElement.focus();
  //   success = false;
  //   return;
  // } else {
  //   // if (mrollnoElement.value.length != 4) {
  //   //   success = false;
  //   //   setModalError(mrollnoElement, "Please enter 4 digits number");
  //   //   rollnoElement.value = "";
  //   //   rollnoElement.focus();
  //   //   return;
  //   // }
  //   // if (isNaN(rollno)) {
  //   //   setModalError(mrollnoElement, "Please input numeric characters only");
  //   //   mrollnoElement.value = "";
  //   //   mrollnoElement.focus();
  //   //   success = false;
  //   //   return;
  //   // }
  //   setModalSuccess(rollnoElement);
  // }

  if (english == "") {
    setModalError(menglishElement, "Mark is required");
    menglishElement.value = "";
    menglishElement.focus();
    success = false;
    return;
  } else {
    if (
      menglishElement.value.length != 2 &&
      menglishElement.value.length != 1 &&
      menglishElement.value != 100
    ) {
      success = false;
      setModalError(menglishElement, "Please enter valid marks");
      menglishElement.value = "";
      menglishElement.focus();
      return;
    }
    if (isNaN(english)) {
      setModalError(menglishElement, "Please input numeric characters only");
      menglishElement.value = "";
      menglishElement.focus();
      success = false;
      return;
    }
    setModalSuccess(menglishElement);
  }

  if (maths == "") {
    success = false;
    setModalError(mmathsElement, "Mark is required");
    mmathsElement.value = "";
    mmathsElement.focus();
    return;
  } else {
    if (
      mmathsElement.value.length != 2 &&
      mmathsElement.value.length != 1 &&
      mmathsElement.value != 100
    ) {
      success = false;
      setModalError(mmathsElement, "Please enter valid marks");
      mmathsElement.value = "";
      mmathsElement.focus();
      return;
    }
    if (isNaN(maths)) {
      setModalError(mmathsElement, "Please input numeric characters only");
      mmathsElement.value = "";
      mmathsElement.focus();
      success = false;
      return;
    }
    setModalSuccess(mmathsElement);
  }

  if (science == "") {
    success = false;
    setModalError(mscienceElement, "Mark is required");
    mscienceElement.value = "";
    mscienceElement.focus();
    return;
  } else {
    if (
      mscienceElement.value.length != 2 &&
      mscienceElement.value.length != 1 &&
      mscienceElement.value != 100
    ) {
      success = false;
      setModalError(mscienceElement, "Please enter valid marks");
      mscienceElement.value = "";
      mscienceElement.focus();
      return;
    }
    if (isNaN(science)) {
      setModalError(mscienceElement, "Please input numeric characters only");
      mscienceElement.value = "";
      mscienceElement.focus();
      success = false;
      return;
    }

    setModalSuccess(mscienceElement);
  }

  if (social == "") {
    success = false;
    setModalError(msocialElement, "Mark is required");
    msocialElement.value = "";
    msocialElement.focus();
    return;
  } else {
    if (
      msocialElement.value.length != 2 &&
      msocialElement.value.length != 1 &&
      msocialElement.value != 100
    ) {
      success = false;
      setModalError(msocialElement, "Please enter valid marks");
      msocialElement.value = "";
      msocialElement.focus();
      return;
    }
    if (isNaN(social)) {
      setModalError(msocialElement, "Please input numeric characters only");
      msocialElement.value = "";
      msocialElement.focus();
      success = false;
      return;
    }
    setModalSuccess(msocialElement);
  }

  if (tamil == "") {
    success = false;
    setModalError(mtamilElement, "Mark is required");
    mtamilElement.value = "";
    mtamilElement.focus();
    return;
  } else {
    if (
      mtamilElement.value.length != 2 &&
      mtamilElement.value.length != 1 &&
      mtamilElement.value != 100
    ) {
      success = false;
      setModalError(mtamilElement, "Please enter valid marks");
      mtamilElement.value = "";
      mtamilElement.focus();
      return;
    }
    if (isNaN(tamil)) {
      setModalError(mtamilElement, "Please input numeric characters only");
      mtamilElement.value = "";
      mtamilElement.focus();
      success = false;
      return;
    }
    setModalSuccess(mtamilElement);
  }

  const index = students.findIndex((student) => student.id == id);
  students[index].name = name;
  students[index].gender = gender;
  students[index].rollno = rollno;
  students[index].english = english;
  students[index].maths = maths;
  students[index].science = science;
  students[index].social = social;
  students[index].tamil = tamil;
  loadStudentData();
  top3Students();
  genderwise();
  subjectwise();

  myModal.hide();

  mnameElement.value = "";
  mmaleElement.checked ? "Male" : "Female";
  mrollnoElement.value = "";
  menglishElement.value = "";
  mmathsElement.value = "";
  mscienceElement.value = "";
  msocialElement.value = "";
  mtamilElement.value = "";
});

function top3Students() {
  const rankBody = document.getElementById("rankBody");
  rankBody.innerHTML = "";

  let passedStudents = students.filter((student) => {
    return student.result == "Pass";
  });

  passedStudents.sort((a, b) => {
    return b.average - a.average;
  });

  top3 = passedStudents.slice(0, 3);

  let currentrank = 1;
  let currentAverage = null;
  top3.forEach((student, index) => {
    if (student.average != currentAverage) {
      student.rank = currentrank;
      currentrank++;
    } else {
      student.rank = currentrank - 1;
    }
    currentAverage = student.average;
  });
  top3.forEach((student, index) => {
    rankBody.innerHTML += `<tr>
  <td>${student.rank}</td>
  <td>${student.name}</td>
  <td>${student.average.toFixed(2)}%</td>
  </tr>`;
  });
}

function genderwise() {
  const genBody = document.getElementById("genBody");
  genBody.innerHTML = "";

  let obj = [
    { gender: "Male", strength: 0, pass: 0, percentage: 0 },
    { gender: "Female", strength: 0, pass: 0, percentage: 0 },
  ];

  obj = obj.map((o, index) => {
    o.strength = students.filter(
      (student) => student.gender == o.gender
    ).length;
    o.pass = students.filter(
      (student) => student.gender == o.gender && student.result == "Pass"
    ).length;
    o.percentage = (o.pass / o.strength) * 100;

    genBody.innerHTML += `<tr>
    <td>${o.gender}</td>
    <td>${o.strength}</td>
    <td>${o.pass}</td>
    <td>${o.percentage.toFixed(2)}%</td>
    </tr>`;
    return 0;
  });
}

function getMaxMark(subjectKey) {
  const marks = [];
  students.forEach((student) => {
    marks.push(student[subjectKey]);
  });
  return Math.max(...marks);
}

function getNamesByMark(mark, subjectKey) {
  const names = [];
  students.forEach((student) => {
    if (student[subjectKey] == mark) names.push(student.name);
  });
  return names;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function passPercentSubject(subjectKey) {
  const total = students.length;
  const pass = students.filter((student) => student[subjectKey] >= 35).length;
  return ((pass / total) * 100).toFixed(2);
}

function subjectwise() {
  const subjBody = document.getElementById("subjBody");
  subjBody.innerHTML = "";

  let obj = [
    { subject: "english", name: [], mark: 0, percentage: 0 },
    { subject: "maths", name: [], mark: 0, percentage: 0 },
    { subject: "science", name: [], mark: 0, percentage: 0 },
    { subject: "social", name: [], mark: 0, percentage: 0 },
    { subject: "tamil", name: [], mark: 0, percentage: 0 },
  ];

  obj = obj.map((o) => {
    o.mark = getMaxMark(o.subject);
    o.name = getNamesByMark(o.mark, o.subject);
    o.percentage = passPercentSubject(o.subject);
    subjBody.innerHTML += `<tr>
    <td>${capitalizeFirstLetter(o.subject)}</td>
    <td>${o.name}</td>
    <td>${o.mark}</td>
    <td>${o.percentage}%</td>
    </tr>`;
    return o;
  });
}

function rollnoAlreadyExist(rollno, id = 0) {
  if (id == 0) {
    let result = students.some((student) => student.rollno == rollno);
    return result;
  } else {
    let result = students.some(
      (student) => student.rollno == rollno && student.id != id
    );
    return result;
  }
}

btnAdd.addEventListener("click", function () {
  const name = nameElement.value.trim();
  const gender = maleElement.checked ? "Male" : "Female";
  const rollno = rollnoElement.value.trim();
  const english = Number(englishElement.value.trim());
  const maths = Number(mathsElement.value.trim());
  const science = Number(scienceElement.value.trim());
  const social = Number(socialElement.value.trim());
  const tamil = Number(tamilElement.value.trim());
  const form = document.querySelector("#myForm");

  if (name === "") {
    setError(nameElement, "Name is required");
    nameElement.value = "";
    nameElement.focus();
    success = false;
    return;
  } else {
    setSuccess(nameElement);
  }

  if (rollno == 0) {
    setError(rollnoElement, "Roll No is required");
    rollnoElement.value = "";
    rollnoElement.focus();
    success = false;
    return;
  } else {
    if (rollnoElement.value.length != 4) {
      success = false;
      setError(rollnoElement, "Please enter 4 digits number");
      rollnoElement.value = "";
      rollnoElement.focus();
      return;
    }
    if (isNaN(rollno)) {
      setError(rollnoElement, "Please input numeric characters only");
      rollnoElement.value = "";
      rollnoElement.focus();
      success = false;
      return;
    }
    if (rollnoAlreadyExist(rollno)) {
      setError(rollnoElement, "Roll No already preset.");
      return;
    }
    setSuccess(rollnoElement);
  }

  if (english == "") {
    setError(englishElement, "Mark is required");
    englishElement.value = "";
    englishElement.focus();
    success = false;
    return;
  } else {
    if (
      englishElement.value.length != 2 &&
      englishElement.value.length != 1 &&
      englishElement.value != 100
    ) {
      success = false;
      setError(englishElement, "Please enter valid marks");
      englishElement.value = "";
      englishElement.focus();
      return;
    }
    if (isNaN(english)) {
      setError(englishElement, "Please input numeric characters only");
      englishElement.value = "";
      englishElement.focus();
      success = false;
      return;
    }
    setSuccess(englishElement);
  }

  if (maths == "") {
    success = false;
    setError(mathsElement, "Mark is required");
    mathsElement.value = "";
    mathsElement.focus();
    return;
  } else {
    if (
      mathsElement.value.length != 2 &&
      mathsElement.value.length != 1 &&
      mathsElement.value != 100
    ) {
      success = false;
      setError(mathsElement, "Please enter valid marks");
      mathsElement.value = "";
      mathsElement.focus();
      return;
    }
    if (isNaN(maths)) {
      setError(mathsElement, "Please input numeric characters only");
      mathsElement.value = "";
      mathsElement.focus();
      success = false;
      return;
    }
    setSuccess(mathsElement);
  }

  if (science == "") {
    success = false;
    setError(scienceElement, "Mark is required");
    scienceElement.value = "";
    scienceElement.focus();
    return;
  } else {
    if (
      scienceElement.value.length != 2 &&
      scienceElement.value.length != 1 &&
      scienceElement.value != 100
    ) {
      success = false;
      setError(scienceElement, "Please enter valid marks");
      scienceElement.value = "";
      scienceElement.focus();
      return;
    }
    if (isNaN(science)) {
      setError(scienceElement, "Please input numeric characters only");
      scienceElement.value = "";
      scienceElement.focus();
      success = false;
      return;
    }
    setSuccess(scienceElement);
  }

  if (social == "") {
    success = false;
    setError(socialElement, "Mark is required");
    socialElement.value = "";
    socialElement.focus();
    return;
  } else {
    if (
      socialElement.value.length != 2 &&
      socialElement.value.length != 1 &&
      socialElement.value != 100
    ) {
      success = false;
      setError(socialElement, "Please enter valid marks");
      socialElement.value = "";
      socialElement.focus();
      return;
    }
    if (isNaN(social)) {
      setError(socialElement, "Please input numeric characters only");
      socialElement.value = "";
      socialElement.focus();
      success = false;
      return;
    }
    setSuccess(socialElement);
  }

  if (tamil == "") {
    success = false;
    setError(tamilElement, "Mark is required");
    tamilElement.value = "";
    tamilElement.focus();
    return;
  } else {
    if (
      tamilElement.value.length != 2 &&
      tamilElement.value.length != 1 &&
      tamilElement.value != 100
    ) {
      success = false;
      setError(tamilElement, "Please enter valid marks");
      tamilElement.value = "";
      tamilElement.focus();
      return;
    }
    if (isNaN(tamil)) {
      setError(tamilElement, "Please input numeric characters only");
      tamilElement.value = "";
      tamilElement.focus();
      success = false;
      return;
    }
    setSuccess(tamilElement);
  }

  students.push({
    id: Date.now(),
    name,
    gender,
    rollno,
    english,
    maths,
    science,
    social,
    tamil,
  });

  clearAll();
  loadStudentData();
  top3Students();
  genderwise();
  subjectwise();
});

// Registration Form Validate //

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

function clearAll() {
  nameElement.value = "";
  maleElement.checked = true;
  rollnoElement.value = "";
  englishElement.value = "";
  mathsElement.value = "";
  scienceElement.value = "";
  socialElement.value = "";
  tamilElement.value = "";
}
btnClear.addEventListener("click", clearAll);

searchTxtElement.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filteredData = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.rollno.toLowerCase().includes(query)
  );
  mainBody.innerHTML = "";
  filteredData.forEach((student, index) => {
    mainBody.innerHTML += `<tr>
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.gender}</td>
      <td>${student.rollno}</td>
      <td class="${student.english < 35 ? "fail" : ""}">${student.english}</td>
      <td class="${student.maths < 35 ? "fail" : ""}">${student.maths}</td>
      <td class="${student.science < 35 ? "fail" : ""}">${student.science}</td>
      <td class="${student.social < 35 ? "fail" : ""}">${student.social}</td>
      <td class="${student.tamil < 35 ? "fail" : ""}">${student.tamil}</td>
      <td>${student.total}</td>
      <td>${student.average}</td>
      <td>${student.result}</td>
      <td>${student.grade}</td>
      <td><button data-id='${
        student.id
      }' class='btn btn-primary btn-sm btnEdit'>Edit</button></td>
      <td><button data-id='${
        student.id
      }' class='btn btn-danger btn-sm btnDelete'>Delete</button></td>
    <tr>`;
  });
});

function saveStudentsLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
  console.log("Data Saved to localStorage");
}

function getStudentsDetail() {
  if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getStudentsDetail();
  loadStudentData(true);
  top3Students();
  genderwise();
  subjectwise();
  clearAll();
});

function refreshPage() {
  window.location.reload();
}
