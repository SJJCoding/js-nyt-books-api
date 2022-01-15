var button = document.getElementById("btn");

var form = document.getElementById("frm1")

button.addEventListener("click", render);

//async function getBooks () {  
//    const response = fetch("https://api.adviceslip.com/advice/search/${form.value}");
//    return response.advice;
//};

async function fetchText() {
    let response = await fetch(`https://api.adviceslip.com/advice/search/${document.getElementById('box').value}`);
    let data = await response.json();
    return data;
}

function getHTML(advice){
    return`
    <div class="card" style="width: 18rem;" style="margin-bottom: 50px">
    <div class="card-body">
    <h5 class="card-title">${advice.date}</h5>
    <p class="card-text">${advice.advice}</p>
    </div>
    </div>`
}

async function render(){
    const List = await fetchText(); 
    let html = List.slips.map(x=> getHTML(x)).join('');
    let el = document.getElementById('Grid');
    el.innerHTML = html;
}

async function display(){
    var List = await fetchText();
    console.log(getHTML(List.slips.find(x=> x.id = 1)));
}

