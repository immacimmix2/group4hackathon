 // Open / Close Signup Modal
function openSignupPopup() {
  document.getElementById('signupModal').style.display = 'block';
}

function closeSignupPopup() {
  document.getElementById('signupModal').style.display = 'none';
}

// Redirect to Signup Pages
function goToSignup(role) {
  if(role === 'passenger') window.location.href = 'passenger-signup.html';
  if(role === 'driver') window.location.href = 'drivers-signup.html';
}

// Optional: Close modal if user clicks outside it
window.onclick = function(event) {
  const modal = document.getElementById('signupModal');
  if (event.target === modal) modal.style.display = 'none';
}


    // Open signup popup
    function openSignupPopup() {
      document.getElementById('signupModal').style.display = 'block';
    }

    function closeSignupPopup() {
      document.getElementById('signupModal').style.display = 'none';
    }

    // Go to signup page based on choice
    function goToSignup(role) {
      // For example, redirect to different signup pages
      if(role === 'passenger') {
        window.location.href = 'passenger-signup.html';
      } else if(role === 'driver') {
        window.location.href = 'driver-signup.html';
      }
    }

    // Close modal if user clicks outside the content
    window.onclick = function(event) {
      const modal = document.getElementById('signupModal');
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }