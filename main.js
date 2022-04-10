const inspiration = document.querySelector("#inspiration-form");
const inspirationInput = document.querySelector("#inspiration-form input");
const inspirationList = document.querySelector("#inspiration-list");
const quotes = ["기억났을 때 기록해 놔야 한다", "기록되지 않은 것은 기억되지 않는다", "우리는 모든 것을 기억할 수 없어 기록한다"];
const quote = quotes[Math.floor(Math.random()*quotes.length)];
const inspirationPlaceholder = inspirationInput.setAttribute("placeholder", quote);
const NEWINSPIRATION_KEY = "newInspirations";

let newInspirations = [];


function saveInspirations(){
  localStorage.setItem(NEWINSPIRATION_KEY, JSON.stringify(newInspirations));
}

function deleteInspiration(event){
  const li = event.target.parentElement;
  li.remove();
  //filter() : forEach()와 동일하게, array안에 있는 애들한테 function 한번씩 돌리지만, true인 애들만 return함
  newInspirations = newInspirations.filter((newInspiration)=> newInspiration.id !== parseInt(li.id));
  saveInspirations();
}



function paintNewInpiration(event){
  const li = document.createElement("li");
  li.id = event.id;
  const idSpan = document.createElement("span");
  const whattime = new Date(event.id);
  idSpan.innerText = whattime.toDateString();
  const recorded = document.createElement("p");
  recorded.innerText = event.text;
  const deletebtn = document.createElement("button");
  deletebtn.innerText = "❌";
  deletebtn.addEventListener("click", deleteInspiration);
  li.appendChild(recorded);
  li.appendChild(idSpan);
  li.appendChild(deletebtn);
  // inspirationList.appendChild(li);
  inspirationList.insertBefore(li,inspirationList.firstChild);
  idSpan.style.setProperty('font-style','italic');
  idSpan.style.setProperty('font-size','12px');
}

function savingInspiration(event){
  event.preventDefault();
  const newInspiration = inspirationInput.value;
  //inspirationInput를 다시 빈 상자로 만들기
  inspirationInput.value = "";
  const newInspirationObj = {
    text:newInspiration,
    id:Date.now(),
  };
  newInspirations.push(newInspirationObj);
  paintNewInpiration(newInspirationObj);
  saveInspirations();
}



inspiration.addEventListener("submit",savingInspiration);

const savedInspirations = localStorage.getItem(NEWINSPIRATION_KEY)

//화면 접속 시, 이전에 localStorage에 있던 inspirations 불러오기
if(savedInspirations!==null){
  const parsedInpirations = JSON.parse(savedInspirations);
  newInspirations = parsedInpirations;
  newInspirations.forEach(paintNewInpiration);
}


let spanss = document.querySelectorAll("span");

function beItalic(event){
  event.style.setProperty('font-style','italic');
  event.style.setProperty('font-size','12px');
}

spanss.forEach(beItalic);

