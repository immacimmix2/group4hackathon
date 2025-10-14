// RideNet Passenger Sign-Up Script

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Capture input values
  const data = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    gender: document.getElementById('gender').value,
    nextOfKin: {
      name: document.getElementById('nokName').value,
      phone: document.getElementById('nokPhone').value
    },
    nin: document.getElementById('nin').value
  };

  // Validate required fields
  if (!data.fullName || !data.email || !data.phone || !data.nextOfKin.name || !data.nextOfKin.phone || !data.nin) {
    alert("Please fill in all required fields marked with *");
    return;
  }

  // Simulate form submission
  console.log("Passenger Sign Up Data:", data);
  alert("Sign-up successful! Check console for data.");

  // Reset form
  this.reset();
});
document.addEventListener("DOMContentLoaded", () => {
  // Get the signup button
  const signupBtn = document.getElementById("signupBtn");

  // Add a click event listener
  signupBtn.addEventListener("click", () => {
    // Redirect to the signup page
    window.location.href = "passanger.html";
  });
});
// Google Translate initialization script
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en', // Default language of your website
      includedLanguages: 'en,xog,lg,cgg,ach', // You can add more if supported
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    'google_translate_element' // The ID of the div where the widget appears
  );
}