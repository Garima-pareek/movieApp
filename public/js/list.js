/*jshint esversion: 6 */

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');

//declaring sessionStorage for search values and datetime stamp
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

let dateArray = localStorage.getItem('date') ? JSON.parse(localStorage.getItem('date')) : [];
localStorage.setItem('date', JSON.stringify(dateArray));
const d = JSON.parse(localStorage.getItem('date'));

//calculating date and time and storing it in a variable dateTime
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+",";
  var now = new Date();
  var hh = now.getHours();
  var min = now.getMinutes();

  var ampm = (hh>=12)?'PM':'AM';
  hh = hh%12;
  hh = hh?hh:12;
    hh = hh<10?'0'+hh:hh;
    min = min<10?'0'+min:min;
  var time = hh+":"+min+" "+ampm;
var dateTime = date+' '+' '+time +' ';


//making list element to show the values of search history with date-timestamp
const liMaker = (text,dateT) => {
  const li = document.createElement('li');
const sp1=document.createElement("span");
 const sp=document.createElement("span");
  li.classname="li";
  sp.className="date";
  sp.textContent = dateT;
  sp1.className="searchHistory";
  sp1.textContent = text;
  ul.appendChild(li);
  li.appendChild(sp1);
  li.appendChild(sp);
};

//when user clicks on search button values are stored in arrays
form.addEventListener('submit', function(e) {
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
var stringdate = String(dateTime);
  dateArray.push(stringdate);
  localStorage.setItem('date', JSON.stringify(dateArray));
  liMaker(input.value,stringdate);
});

//sending values to limaker
for(i=0;i<data.length;i++){
  liMaker(data[i],d[i]);
}

input.value = '';


//create a close button and append to each li
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


//click on close button to delete the li
//var close = document.getElementsByClassName("close");
//var i;
//for (i = 0; i < close.length; i++)
//{
  //close[i].onclick = function() {
    //var div = this.parentElement;
    //div.style.display = "none";
//};
//}

//delete from the storage as well
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++)
{
  close[i].onclick = function() {
    const data = JSON.parse(localStorage.getItem('items'));
    const d = JSON.parse(localStorage.getItem('date'));
    var div = this.parentElement;
    div.style.display = "none";
    var index = $(this).index();


      data.splice(data[index], 1);
      localStorage.setItem('items', JSON.stringify(data));
      d.splice(d[index], 1);
      localStorage.setItem('date', JSON.stringify(d));

};
}


//when user clicks on searhHistory item value is send to the input tag
var items = document.querySelectorAll(".searchHistory");
for(var i = 0; i < items.length; i++)
           {
               items[i].onclick = function(){
document.getElementById("item").value = this.textContent;
};
           }


//clearing sessionstorage when there is no item in searchhistory list
button.addEventListener('click', function() {
localStorage.clear();
 while (ul.firstChild) {
  ul.removeChild(ul.firstChild);
  }
});
//clear search History
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("list1").classList.toggle("show");


}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.inputField')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
document.getElementById("list1").addEventListener('click',function(event){
    event.stopPropagation();
});
document.getElementById("cleard").addEventListener('click',function(event){
  document.getElementById("myUL").innerHTML = "";
localStorage.clear();
});
