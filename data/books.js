var button = document.getElementById("btn");

var form = document.getElementById("frm1")

var pg0 = document.getElementById("pg0");

var pg1 = document.getElementById("pg1");

var pg2 = document.getElementById("pg2");

var topBar = document.getElementById("UL1");

pg0.onclick = changePage0;

pg1.onclick = changePage1;

pg2.onclick = changePage2;

var pageNum = 0;

button.addEventListener("click", render);


button.addEventListener("click", backgroundIMG);

//Garbage code, should be changed later


//async function getBooks () {  
//    const response = fetch("https://api.adviceslip.com/advice/search/${form.value}");
//    return response.advice;
//};

async function fetchText() {
        try{
            let response = await fetch(`https://api.adviceslip.com/advice/search/${document.getElementById('box').value}`);
            let data = await response.json();
            return data;
        } catch (error) {
            return console.log(error);
        }
}

function getHTML(advice){
    return`
    <div class="card" style="width: 18rem;" style="margin-bottom: 50px">
    <div class="card-body">
    <h5 class="card-title">${advice.date}</h5>
    <p class="card-text">${advice.advice}</p>
    </div>
    </div>`}





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

function changePage0(){
    pageNum = 0;
    pg0.style.fontWeight = "bold"
    pg1.style.fontWeight = "initial"
    pg2.style.fontWeight = "initial"
    return true;
}

function changePage1(){
    pageNum = 1;
    pg0.style.fontWeight = "initial"
    pg1.style.fontWeight = "bold"
    pg2.style.fontWeight = "initial"
    return true;
}

function changePage2(){
    pageNum = 2;
    pg0.style.fontWeight = "initial"
    pg1.style.fontWeight = "initial"
    pg2.style.fontWeight= "bold"
    return true;
}

 function backgroundIMG(){
     if(pageNum === 0){
         topBar.style.backgroundImage = "url(https://static-cse.canva.com/blob/572026/removingbackgroundimages_Unsplash.jpeg)";     
   }else if(pageNum === 1){
       topBar.style.backgroundImage = "url(https://wallpapersmug.com/large/da140e/green-leaf-dense-big.jpg)";     

    }else{
        topBar.style.backgroundImage = "url(https://static-cse.canva.com/blob/572026/removingbackgroundimages_Unsplash.jpeg)";     

}
}

