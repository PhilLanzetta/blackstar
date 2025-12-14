/*
/!* Add classes to elements by finding landmarks, to make it easier / possible to style some elements *!/

window.blackStarEventive = {
  handleSchedule() {
      var scheduleSearch = document.querySelector('button .icon-search');

      if (!scheduleSearch) {
          return;
      }

      var filters = scheduleSearch.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

      if (filters) {
          filters.classList.add('bs-schedule__filters');
          filters.parentElement.classList.add('bs-schedule');
      }
  },
};

window.addEventListener('load', function() {
    try {
      //  window.blackStarEventive.handleSchedule();
    } catch (Exception)
    {
        console.log(Exception);
    }

});
*/
