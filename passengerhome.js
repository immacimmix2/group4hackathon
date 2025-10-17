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