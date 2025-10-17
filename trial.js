document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // prevent form submission

  // Clear previous errors
  const errorFields = [
    'firstNameError', 'lastNameError', 'emailError', 'pwdError',
    'cpwdError', 'phoneError', 'genderError', 'idError',
    'kinNameError', 'kinPhoneError', 'relationshipError'
  ];
  errorFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  // Get values
  const firstname = document.getElementById('firstname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pwd').value;
  const confirmpassword = document.getElementById('cpwd').value;
  const phoneNumber = document.getElementById('phoneNumber').value.trim(); // ✅ changed variable name
  const Gender = document.getElementById('gender').value;
  const NIN = document.getElementById('NIN').value.trim();
  const Kinname = document.getElementById('Kinname').value.trim();
  const KinPhoneNumber = document.getElementById('KinPhoneNumber').value.trim();
  const Relationship = document.getElementById('Relationship').value;

  let isValid = true;

  // ✅ Validation
  if (firstname === '') { showError('firstNameError', 'First name is required'); isValid = false; }
  if (lastname === '') { showError('lastNameError', 'Last name is required'); isValid = false; }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) { showError('emailError', 'Invalid email address'); isValid = false; }

  if (password.length < 6) { showError('pwdError', 'Password must be at least 6 characters'); isValid = false; }
  if (password !== confirmpassword) { showError('cpwdError', 'Passwords do not match'); isValid = false; }

  const phoneRegex = /^\+?\d{7,15}$/;
  if (!phoneRegex.test(phoneNumber)) { showError('phoneError', 'Invalid phone number'); isValid = false; }

  if (Gender === '') { showError('genderError', 'Select your gender'); isValid = false; }

  if (NIN.length !== 14) {
    showError('idError', 'NIN must be 14 characters'); isValid = false;
  } else if (gender === 'Male' && !/^CM/i.test(NIN)) {
    showError('idError', 'Male NIN must start with "CM"'); isValid = false;
  } else if (gender === 'Female' && !/^CF/i.test(NIN)) {
    showError('idError', 'Female NIN must start with "CF"'); isValid = false;
  }

  if (Kinname === '') { showError('kinNameError', 'Next of Kin name is required'); isValid = false; }
  if (!phoneRegex.test(KinPhoneNumber)) { showError('kinPhoneError', 'Invalid Next of Kin phone number'); isValid = false; }
  if (phoneNumber === KinPhoneNumber) { showError('kinPhoneError', 'Phone and Kin phone cannot be the same'); isValid = false; }
  if (Relationship === '') { showError('relationshipError', 'Please select relationship'); isValid = false; }

  if (!isValid) return;

  // ✅ Submit to backend
  try {
    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        phoneNumber,
        Gender,
        NIN,
        Kinname,
        KinPhoneNumber,
        Relationship
      })
    });

    const data = await response.json();

    const successMessage = document.getElementById('successMessage');
    if (response.ok) {
      successMessage.textContent = '✅ Signup successful! You can now login.';
      successMessage.style.color = 'green';
      this.reset(); // Clear form
    } else {
      successMessage.textContent = data.message || 'Signup failed. Please try again.';
      successMessage.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    alert('⚠️ Server error. Make sure your backend is running on port 3000.');
  }

  // Helper function for showing errors
  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }
});
