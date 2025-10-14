document.getElementById('infoForm').addEventListener('submit', function (event) {
    var phone = document.getElementById('phone').value.trim();
    var nextOfKin = document.getElementById('nextofkin').value.trim();
    var idNumber = document.getElementById('idnumber').value.trim();
    var gender = document.querySelector('input[name="gender"]:checked');
    var fullName = document.getElementById('fullname').value.trim();
    var dob = document.getElementById('dob').value;
   

    // Error message containers
    var phoneError = document.getElementById('phoneError');
    var nextOfKinError = document.getElementById('nextofkinError');
    var idError = document.getElementById('IdError');
    var genderError = document.getElementById('genderError');
    var nameError = document.getElementById('nameError');
    var dobError = document.getElementById('dobError');
     const dobError = document.getElementById('dobError');
     
    // Clear old errors
    phoneError.textContent = '';
    nextOfKinError.textContent = '';
    idError.textContent = '';
    genderError.textContent = '';
    nameError.textContent = '';
    dobError.textContent = '';
    

    var valid = true;

    // Validate full name
    // Split the name into parts (based on spaces)
    var nameParts = fullName.split(/\s+/); // splits on any amount of spaces

    // Validation rules
    if (fullName === '') {
        nameError.textContent = 'Full name is required.';
        valid = false;
    }
    if (nameParts.length < 2) {
        nameError.textContent = 'Please enter at least two names (first and last).';
        valid = false;
    }
    if (nameParts.length > 3) {
        nameError.textContent = 'Please enter no more than three names.';
        valid = false;
    }

    // Optional: check for valid characters only (letters and spaces)
    if (!/^[A-Za-z\s]+$/.test(fullName)) {
        nameError.textContent = 'Name must contain only letters and spaces.';
        valid = false;
    }


// Check if both contacts are the same
if (phone === nextOfKin) {
    //phoneError.textContent = 'Phone number and Next of Kin cannot be the same.';
    nextOfKinError.textContent = 'Phone number and Next of Kin cannot be the same.';
    valid = false;
}

// Phone number validations
if (phone.length !== 10) {
    phoneError.textContent = 'must be a 10 digit number.';
    valid = false;
}
else if (!/^[0-9]{10}$/.test(phone)) {
    phoneError.textContent = 'only numbers';
    valid = false;
}

// Next of kin validations
if (nextOfKin.length !== 10) {
    nextOfKinError.textContent = 'must be a 10 digit number';
    valid = false;
} else if (!/^[0-9]{10}$/.test(nextOfKin)) {
    nextOfKinError.textContent = 'only numbers.';
    valid = false;
}

// Check gender selection
if (!gender) {
    genderError.textContent = 'Please select your gender.';
    valid = false;
} else {
    gender = gender.value; // extract the actual value (male/female)
}
 // ✅ Validate date of birth
  if (!dob) {
    dobError.textContent = 'Please select your date of birth.';
    valid = false;
  }

  // Extract year from date of birth
  const dobYear = new Date(dob).getFullYear();
  const yearDigits = dobYear.toString().slice(-2); // last two digits
//validating the length of the id number
if (idNumber.length !== 14) {
    idError.textContent = ' must be a 14 digit NIN';
    valid = false;
}
// Validate ID prefix based on gender
if (gender && idNumber) {
    if (gender === 'male' && !/^CM/i.test(idNumber)) {
        idError.textContent = 'Male ID numbers must start with "CM".';
        valid = false;
    }
    else if (gender === 'female' && !/^CF/i.test(idNumber)) {
        idError.textContent = 'Female ID numbers must start with "CF".';
        valid = false;
    }
}


if (!valid) {
    event.preventDefault();
}
});


//----------Login form validation-----------------
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting

  const loginId = document.getElementById('loginId').value.trim();
  const password = document.getElementById('password').value.trim();

  // Error message containers
  const loginError = document.getElementById('loginError');
  const passwordError = document.getElementById('passwordError');

  // Clear old errors
  loginError.textContent = '';
  passwordError.textContent = '';

  let valid = true;

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
  const phonePattern = /^[0-9]{10,}$/; // Only digits, at least 10 characters

  // Check if loginId is either a valid email or phone number
  if (!emailPattern.test(loginId) && !phonePattern.test(loginId)) {
    loginError.textContent = "Please enter a valid email or phone number.";
    valid = false;
  }

  // Validate password (example rule: min 6 characters)
  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    valid = false;
  }

  // If everything is valid
  if (valid) {
    alert("Login successful!");
    // TODO: Replace this with actual login logic (e.g., API call)
  }
});
