function showForm(type) {
      document.getElementById("loginTab").classList.remove("active");
      document.getElementById("registerTab").classList.remove("active");
      document.getElementById("loginForm").classList.remove("active");
      document.getElementById("registerForm").classList.remove("active");

      if (type === "login") {
        document.getElementById("loginTab").classList.add("active");
        document.getElementById("loginForm").classList.add("active");
      } else {
        document.getElementById("registerTab").classList.add("active");
        document.getElementById("registerForm").classList.add("active");
      }
    }

    function setLanguage(lang) {
      localStorage.setItem("language", lang);
      alert("Language set to " + lang);
    }

    function goToSignupPage() {
      const userType = document.getElementById("userType").value;
      if (userType === "driver") window.location.href = "signup_driver.html";
      else if (userType === "rider") window.location.href = "signup_rider.html";
      else if (userType === "client") window.location.href = "signup_client.html";
    }
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