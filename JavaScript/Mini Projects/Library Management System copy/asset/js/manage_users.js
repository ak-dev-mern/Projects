//Get data from new user
//Get Registration inputs
const formEl = document.querySelector("form");
const idEl = document.getElementById("id");
const rollEl = document.getElementById("roll");
const userNameEl = document.getElementById("userName");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const cpasswordEl = document.getElementById("cpassword");
const numberEl = document.getElementById("number");
const dobEl = document.getElementById("dob");
const cityEl = document.getElementById("city");
const pincodeEl = document.getElementById("pincode");
const addressEl = document.getElementById("address");
const termsEl = document.getElementById("terms");
const newsletterEl = document.getElementById("newsletter");

const maleEl = document.getElementById("male");
const femaleEl = document.getElementById("female");
const othersEl = document.getElementById("others");
let genderVal = "";

//Get Login inputs
let loginRollEl = document.getElementById("loginRoll");
let loginEmailEl = document.getElementById("loginEmail");
let loginPasswordEl = document.getElementById("loginPassword");

// Buttons
const btnAdd = document.getElementById("btnAdd");
const btnSave = document.getElementById("submit");
const btnClear = document.getElementById("clear");
const btnLogin = document.getElementById("btnLogin");

// Modal title change

const modalTitle = document.getElementById("title");
const alertMsg = document.getElementById("alert");
// const mainModalTitle = document.getElementById("exampleModalLabel");

//Filter
const filterUser = document.getElementById("filterUser");

// Load data in table
const userTableBody = document.querySelector("#usertable");

// Modal open and hide
const Modal = new bootstrap.Modal(exampleModal, {
  keyboard: false,
});

btnAdd.addEventListener("click", function () {
  Modal.show();
  clearAll();
});

// Show and hide tab

const bsTab = new bootstrap.Tab("#profile-tab");

btnSave.addEventListener("click", function () {
  show.bs.tab();
});

// form validation error message

function setError(element, message) {
  const formGroup = element.parentElement;
  const errorElement = formGroup.querySelector(".error");

  errorElement.innerHTML = message;
  formGroup.classList.add("error");
  formGroup.classList.remove("success");
}

function setSuccess(element) {
  const formGroup = element.parentElement;
  const errorElement = formGroup.querySelector(".error");

  errorElement.innerText = "";
  formGroup.classList.add("success");
  formGroup.classList.remove("error");
}

// Add new user
btnSave.addEventListener("click", function () {
  const id = idEl.value;
  const roll = rollEl.value;
  const userName = userNameEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;
  const cpassword = cpasswordEl.value;
  const number = numberEl.value;
  const dob = dobEl.value;
  const gender = male.checked ? "Male" : female.checked ? "Female" : "Others";
  const city = cityEl.value;
  const pincode = pincodeEl.value;
  const address = addressEl.value;
  const terms = termsEl.checked ? "Agreed" : "Disagree";
  const newsletter = newsletterEl.checked ? "Agreed" : "Disagree";
  let userData = getUserDetails();
  const ModalStatus = new bootstrap.Modal(myModalMessage, {
    keyboard: false,
  });
  // Form validation

  if (roll === "") {
    rollEl.focus();
    setError(rollEl, "Please select your roll");
    return;
  } else {
    setSuccess(rollEl);
  }

  if (userName === "") {
    userNameEl.focus();
    setError(userNameEl, "Name is required");
    return;
  } else {
    if (userName.length < 3) {
      userNameEl.focus();
      setError(userNameEl, "Name should have atleast 3 charecters");
      return;
    }
    setSuccess(userNameEl);
  }
  if (email === "") {
    emailEl.focus();
    setError(emailEl, "Please enter your email");
    return;
  } else {
    const emailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailformat.test(email)) {
      setSuccess(emailEl);
    } else {
      emailEl.focus();
      setError(emailEl, "Please enter valid email");
      return;
    }
    setSuccess(emailEl);
  }

  if (password === "") {
    passwordEl.focus();
    setError(passwordEl, "Please enter your password");
    return;
  } else {
    if (password.length < 8) {
      passwordEl.focus();
      setError(passwordEl, "Password should be at least 8 characters");
      return;
    } else if (password.length > 16) {
      passwordEl.focus();
      setError(passwordEl, "Password should not exceed 16 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      passwordEl.focus();
      setError(passwordEl, "Password should have at least 1 uppercase");

      return;
    } else if (!/[a-z]/.test(password)) {
      passwordEl.focus();
      setError(passwordEl, "Password should have at least 1 lowercase");
      return;
    } else if (!/[0-9]/.test(password)) {
      passwordEl.focus();
      setError(passwordEl, "Password should have at least 1 number");
      return;
    } else if (!/(?=.[$#%£&§@])/.test(password)) {
      passwordEl.focus();
      setError(passwordEl, "Password should have at least 1 special character");
      return;
    } else {
      setSuccess(passwordEl);
    }
  }
  if (cpassword === "") {
    cpasswordEl.focus();
    setError(cpasswordEl, "Please enter your confirm password");
    return;
  } else {
    if (cpassword != password) {
      cpasswordEl.focus();
      setError(cpasswordEl, "Confirm password dose not match");
      return;
    } else {
      setSuccess(cpasswordEl);
    }
  }

  // let numberReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (number === "") {
    numberEl.focus();
    setError(numberEl, "Please enter your mobile number");
    return;
  } else {
    if (number.length != 10) {
      numberEl.focus();
      setError(numberEl, "Please 10 digits number only");
      return;
    }
    if (isNaN(number)) {
      numberEl.focus();
      setError(numberEl, "Please enter number only");
      return;
    } else {
      setSuccess(numberEl);
    }
  }

  if (dob === "") {
    dobEl.focus();
    setError(dobEl, "Please enter your date of birth");
    return;
  } else {
    setSuccess(dobEl);
  }

  if (city === "") {
    cityEl.focus();
    setError(cityEl, "Please select your country");
    return;
  } else {
    setSuccess(cityEl);
  }

  if (pincode === "") {
    pincodeEl.focus();
    setError(pincodeEl, "Please enter your pin code");
    return;
  } else {
    if (pincode.length != 6) {
      pincodeEl.focus();
      setError(pincodeEl, "Please enter 6 digits pin code");
      return;
    }
    if (isNaN(pincode)) {
      pincodeEl.focus();
      setError(pincodeEl, "Please enter number only");
      return;
    } else {
      setSuccess(pincodeEl);
    }
  }

  if (address === "") {
    addressEl.focus();
    setError(addressEl, "Please enter your address");
    return;
  } else {
    setSuccess(addressEl);
  }

  if (id) {
    //Update tools
    let updatedUsers = userData.map((user) => {
      if (user.id == id) {
        return {
          ...user,
          roll: roll,
          userName: userName,
          email: email,
          password: password,
          cpassword: cpassword,
          number: number,
          dob: dob,
          gender: gender,
          city: city,
          pincode: pincode,
          address: address,
          terms: terms,
          newsletter: newsletter,
        };
      } else {
        return user;
      }
    });
    saveUsersLocalStorage(updatedUsers);
    Modal.hide();
    ModalStatus.show();
    // mainModalTitle.innerHTML = "UPDATE USER";
    modalTitle.innerHTML = "User Update Status";
    alertMsg.innerHTML = "User Updated Successfully...";
    clearAll();
    loadUser();
  } else {
    //Add Tools
    const userObj = {
      id: Math.floor(1000 + Math.random() * 9000),
      roll: roll,
      userName: userName,
      email: email,
      password: password,
      cpassword: cpassword,
      number: number,
      dob: dob,
      gender: gender,
      city: city,
      pincode: pincode,
      address: address,
      terms: terms,
      newsletter: newsletter,
    };

    userData.push(userObj);
    ModalStatus.show();

    saveUsersLocalStorage(userData);
    clearAll();
    loadUser();
    counter();
    modalTitle.innerHTML = "New User Registration";
    // Get last index value
    let userIndex = getUserDetails();
    const userId = userIndex.map(({ id }) => id);
    const lastvalue = userId.at(-1);
    alertMsg.innerHTML =
      "User Added Successfully..." +
      `<br> <div class=" text-center mt-2">Please take note your user ID </div> <br><div class="fw-bold display-2 text-center">${lastvalue}</div> <br> <br> <div class="text-center">Please refersh the page before login</div>`;
  }
  bsTab.show();
});

//Edit users
function editUsers(id) {
  Modal.show();

  let userData = getUserDetails();
  const selectedUsers = userData.filter((user) => user.id == id)[0];
  idEl.value = selectedUsers.id;
  rollEl.value = selectedUsers.roll;
  userNameEl.value = selectedUsers.userName;
  emailEl.value = selectedUsers.email;
  passwordEl.value = selectedUsers.password;
  cpasswordEl.value = selectedUsers.cpassword;
  numberEl.value = selectedUsers.number;
  dobEl.value = selectedUsers.dob;
  cityEl.value = selectedUsers.city;
  pincodeEl.value = selectedUsers.pincode;
  addressEl.value = selectedUsers.address;

  genderVal === "Male"
    ? (maleEl.checked = true)
    : genderVal === "Female"
    ? (femaleEl.checked = true)
    : (othersEl.checked = true);

  loadUser();
}

// Delete user

function deleteUser(id) {
  if (id) {
    userData = getUserDetails();
    let updatedUsers = userData.filter((user) => user.id != id);
    userData = updatedUsers;
    saveUsersLocalStorage(updatedUsers);
    msgModal.hide();
    loadUser();
    counter();
    setTimeout(deleteSuccessMessage, 200);
  }
}

// Delete Success message with timer

function deleteSuccessMessage() {
  const ModalStatus = new bootstrap.Modal(myModalMessage, {
    keyboard: false,
  });
  const modalTitle = document.getElementById("title");
  const alertMsg = document.getElementById("alert");
  ModalStatus.show();
  modalTitle.innerHTML = "Delete User";
  alertMsg.innerHTML = "User Deleted Successfully...";
}

// Custom modal delete with confirmation

const msgModal = new bootstrap.Modal(myModalDelete, {
  keyboard: false,
});

function showDeleteModal(callback) {
  msgModal.show();

  document.getElementById("yes").addEventListener("click", function () {
    callback(true);
    msgModal.hide();
  });

  document.getElementById("no").addEventListener("click", function () {
    callback(false);
    msgModal.hide();
  });
}

function deleteUserWithConfirmation(id) {
  showDeleteModal(function (confirmed) {
    if (confirmed) {
      deleteUser(id);
    }
  });
}

// Save user data to localStorage...

function saveUsersLocalStorage(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
  console.log("Data Saved to localStorage");
  loadUser();
}

// Get user data from localStorage...

function getUserDetails() {
  let data = [];
  if (localStorage.getItem("userData") !== null) {
    data = JSON.parse(localStorage.getItem("userData"));
  }
  return data;
}

// Load user data

function loadUser(isForSearch = 0, filterUser = []) {
  let userData = [];
  if (isForSearch == 0) {
    userData = getUserDetails();
  } else {
    userData = filterUser;
  }

  userTableBody.innerHTML = "";
  userData.forEach((user, index) => {
    userTableBody.innerHTML += `<tr>
          <td>${index + 1}</td>
          <td>${user.id}</td>
          <td>${user.roll}</td>
          <td>${user.userName}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.cpassword}</td>
          <td>${user.number}</td>
          <td>${user.dob}</td>
          <td>${user.gender}</td>
          <td>${user.city}</td>
          <td>${user.pincode}</td>
          <td>${user.address}</td>
          <td>${user.terms}</td>
          <td>${user.newsletter}</td>
          <td><button id="btnEdit" onclick="editUsers(${
            user.id
          })" class="btn btn-sm btn-primary">Edit</button></td>
          <td><button id="btnDel" onclick="deleteUserWithConfirmation(${
            user.id
          })" class="btn btn-sm btn-danger">Delete</button></td>
          </tr>`;
  });
}

loadUser();

// ClearAll

function clearAll() {
  rollEl.value = "";
  userNameEl.value = "";
  emailEl.value = "";
  passwordEl.value = "";
  cpasswordEl.value = "";
  numberEl.value = "";
  dobEl.value = "";
  cityEl.value = "";
  pincodeEl.value = "";
  addressEl.value = "";
}

btnClear.addEventListener("click", clearAll);

//Filter users
filterUser.addEventListener("input", function () {
  const searchQuery = this.value.toLowerCase();
  const userData = getUserDetails();
  const filterUser = userData.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery) ||
      user.id.toString().includes(searchQuery)
  );
  loadUser(1, filterUser);
});

function reloadPage() {
  location.reload();
}

// Table row count and show on dashboard
function counter() {
  const rowCount = document.getElementById("userReg").rows.length - 1;
  const totalUser = document.getElementById("totalUser");
  totalUser.innerHTML = rowCount;
  const totalStaff = document.getElementById("totalStaff");
  const totalStudent = document.getElementById("totalStudent");
  const totalMale = document.getElementById("totalMale");
  const totalFemale = document.getElementById("totalFemale");
  const totalOthers = document.getElementById("totalOthers");

  const userData = getUserDetails();
  let staff = 0;
  let student = 0;
  let male = 0;
  let female = 0;
  let others = 0;

  userData.forEach((user) => {
    user.roll;
    user.gender;
    if (user.roll == "Staff") {
      staff++;
    }
    if (user.roll == "Student") {
      student++;
    }
    if (user.gender == "Male") {
      male++;
    }
    if (user.gender == "Female") {
      female++;
    }
    if (user.gender == "Others") {
      others++;
    }

    totalStaff.innerHTML = staff;
    totalStudent.innerHTML = student;
    totalMale.innerHTML = "Male" + " - " + male;
    totalFemale.innerHTML = "Female" + " - " + female;
    totalOthers.innerHTML = "Others" + " - " + others;
  });
}

counter();

// Window refresh

// function reload() {
//   Modal.show();
// }
// reload();

// Login

function getUserById(userId) {
  userData = getUserDetails();
  // Find the user with the matching ID
  const user = userData.find((user) => user.id === userId);

  // Check if the user was found
  if (user) {
    return {
      roll: user.roll,
      email: user.email,
      password: user.password,
    };
  } else {
    return null; // User not found
  }
}

btnLogin.addEventListener("click", function () {
  let loginPersonId = document.getElementById("loginPersonId").value;
  let loginRoll = loginRollEl.value;
  let loginEmail = loginEmailEl.value;
  let loginPassword = loginPasswordEl.value;
  userData = getUserDetails();

  const ModalStatus = new bootstrap.Modal(myModalMessage, {
    keyboard: false,
  });

  // Example usage:
  const userId = Number(loginPersonId);
  const userCredentials = getUserById(userId);

  // let rollList = userData.map(({ roll }) => roll);
  let rollValue = userCredentials.roll;

  // let emailList = userData.map(({ email }) => email);
  let emailValue = userCredentials.email;

  // let passwordList = userData.map(({ password }) => password);
  let passwordValue = userCredentials.password;

  if (loginRoll === "") {
    loginRollEl.focus();
    setError(loginRollEl, "Please select your roll");
    return;
  } else {
    setSuccess(loginRollEl);
  }

  if (loginEmail === "") {
    loginEmailEl.focus();
    setError(loginEmailEl, "Please enter your email");
    return;
  } else {
    const emailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailformat.test(loginEmail)) {
      setSuccess(loginEmailEl);
    } else {
      loginEmailEl.focus();
      setError(loginEmailEl, "Please enter valid email");
      return;
    }
    setSuccess(loginEmailEl);
  }
  if (loginPassword === "") {
    loginPasswordEl.focus();
    setError(loginPasswordEl, "Please enter your password");
    return;
  } else {
    setSuccess(loginPasswordEl);
  }

  if (
    rollValue == loginRoll &&
    emailValue == loginEmail &&
    passwordValue == loginPassword
  ) {
    loginRollEl = "";
    loginEmailEl = "";
    loginPasswordEl = "";
    Modal.hide();
    ModalStatus.show();
    modalTitle.innerHTML = "User Login";
    alertMsg.innerHTML = "User Login Successfull...";
    btnAdd.style.display = "none";
  } else {
    ModalStatus.show();
    modalTitle.innerHTML = "Warning";
    alertMsg.innerHTML = "User details does not match";
    setError(loginRollEl, "");
    setError(loginEmailEl, "");
    setError(loginPasswordEl, "");
  }
  loadUser();
});

// //password show/hide

function passwordShowAndHide() {
  let pass = document.querySelector(".pass");
  let cPass = document.querySelector(".cpass");
  let lPass = document.querySelector(".lpass");
  let password_input = document.querySelector("#password");
  let c_password_input = document.querySelector("#cpassword");
  let l_password_input = document.querySelector("#loginPassword");

  pass.addEventListener("click", function () {
    if (password_input.getAttribute("type") == "password") {
      password_input.setAttribute("type", "text");
      pass.classList.add("bi-eye-slash");
      pass.classList.remove("bi-eye");

    } else {
      password_input.setAttribute("type", "password");
       pass.classList.remove("bi-eye-slash");
       pass.classList.add("bi-eye");
    }
  });

  cPass.addEventListener("click", function () {
    if (c_password_input.getAttribute("type") == "password") {
      c_password_input.setAttribute("type", "text");
      cPass.classList.add("bi-eye-slash");
      cPass.classList.remove("bi-eye");
    } else {
      c_password_input.setAttribute("type", "password");
      cPass.classList.remove("bi-eye-slash");
      cPass.classList.add("bi-eye");
    }
  });

    lPass.addEventListener("click", function () {
      if (l_password_input.getAttribute("type") == "password") {
        l_password_input.setAttribute("type", "text");
        lPass.classList.add("bi-eye-slash");
        lPass.classList.remove("bi-eye");
      } else {
        l_password_input.setAttribute("type", "password");
        lPass.classList.remove("bi-eye-slash");
        lPass.classList.add("bi-eye");
      }
    });
}
passwordShowAndHide();
