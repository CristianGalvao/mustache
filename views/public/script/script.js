const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const searchBtn = document.querySelector(".search-box");
const navlink = document.querySelectorAll('.nav-link');
const home = document.querySelector(".loadHome");

const loadHome = document.querySelector(".teste");

window.onload = function () {
  openCity(event, 'Home')
  home.className = 'nav-link active'
  console.log(home)
};


toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close")
});


function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("home");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("nav-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}


// LOGOUT
function formLogout() {
  document.getElementById("form-logout").submit();
}
