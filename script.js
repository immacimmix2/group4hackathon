function setLanguage(lang) {
  localStorage.setItem('language', lang);
  window.location.href = 'login.html';
}

function toggleSignup() {
  document.getElementById('signup-options').classList.toggle('hidden');
}

function goToSignup() {
  const type = document.getElementById('userType').value;
  if (type === 'rider') window.location.href = 'signup_rider.html';
  else if (type === 'driver') window.location.href = 'signup_driver.html';
  else if (type === 'client') window.location.href = 'signup_client.html';
  else alert('Please select a type');
}

function goToThankYou() {
  window.location.href = 'thankyou.html';
}

function goToLogin() {
  alert('Login page coming soon!');
}
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
