const signupForm = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');

signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form values
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const Gender = document.getElementById('gender').value;
    const NIN = document.getElementById('nin').value.trim();
    const vehicle = document.getElementById('vehicle').value;
    const numberPlate = document.getElementById('numberPlate').value.trim();
    const kinname = document.getElementById('nextofkin').value.trim();
    const kinPhoneNumber = document.getElementById('kinPhoneNumber').value.trim();
    const Relationship = document.getElementById('relationship').value;
    const password = document.getElementById('pwd').value;
    const confirmpassword = document.getElementById('cpwd').value;

    // Clear previous errors
    const errorFields = [
        'firstnameError', 'lastnameError', 'emailError', 'phoneError', 'genderError',
        'ninError', 'vehicleError', 'numberPlateError',
        'kinNameError', 'kinPhoneError', 'relationshipError',
        'passwordError', 'confirmpasswordError'
    ];
    errorFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });

    // Validation
    let isValid = true;

    if (firstname === '') { document.getElementById('firstnameError').textContent = 'First name is required'; isValid = false; }
    if (lastname === '') { document.getElementById('lastnameError').textContent = 'Last name is required'; isValid = false; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { document.getElementById('emailError').textContent = 'Invalid email'; isValid = false; }

    const phoneRegex = /^\+?\d{9,15}$/;
    if (!phoneRegex.test(phone)) { document.getElementById('phoneError').textContent = 'Invalid phone number'; isValid = false; }

    if (Gender === '') { document.getElementById('genderError').textContent = 'Select gender'; isValid = false; }

    if (NIN.length !== 14) { 
        document.getElementById('ninError').textContent = 'NIN must be 14 characters'; 
        isValid = false; 
    } else if (Gender.toLowerCase() === 'male' && !/^CM/i.test(NIN)) { 
        document.getElementById('ninError').textContent = 'ivalid NIN'; 
        isValid = false; 
    } else if (Gender.toLowerCase() === 'female' && !/^CF/i.test(NIN)) { 
        document.getElementById('ninError').textContent = 'NIN'; 
        isValid = false; 
    }

    if (vehicle === '') { document.getElementById('vehicleError').textContent = 'Select vehicle type'; isValid = false; }
    if (numberPlate === '') { document.getElementById('numberPlateError').textContent = 'Number plate is required'; isValid = false; }

    if (kinname === '') { document.getElementById('kinNameError').textContent = 'Next of kin name is required'; isValid = false; }
    if (!phoneRegex.test(kinPhoneNumber)) { document.getElementById('kinPhoneError').textContent = 'Invalid kin phone'; isValid = false; }
    if (Relationship === '') { document.getElementById('relationshipError').textContent = 'Select relationship'; isValid = false; }

    if (password.length < 6) { document.getElementById('passwordError').textContent = 'Password must be at least 6 characters'; isValid = false; }
    if (password !== confirmpassword) { document.getElementById('confirmpasswordError').textContent = 'Passwords do not match'; isValid = false; }

    if (!isValid) return;

    // Send data to backend
    try {
        const response = await fetch('http://localhost:3000/riders/registerRider', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                phoneNumber: phone,
                Gender,
                NIN,
                vehicle,
                numberPlate,
                Kinname: kinname,
                kinPhoneNumber,
                Relationship,
                password,
                confirmpassword,
               role: "driver"
            })
        });

        const data = await response.json();

        if (response.ok) {
            successMessage.textContent = "Signup successful! Redirecting...";
            successMessage.style.color = "green";
            e.target.reset();
            setTimeout(() => {
                window.location.href = "passengerhome.html";
            }, 1500);
        } else {
            successMessage.textContent = data.message || "Signup failed. Please try again.";
            successMessage.style.color = "red";
        }
    } catch (err) {
        console.error(err);
        successMessage.textContent = "Server error. Please try again later.";
        successMessage.style.color = "red";
    }
});
