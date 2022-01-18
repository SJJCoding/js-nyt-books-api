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

var Se = 0;

button.addEventListener("click", render);

// button.addEventListener("mouseover", search)

pg0.addEventListener("click", pageHide);

pg1.addEventListener("click", pageHide);

pg2.addEventListener("click", pageHide);

pg2.addEventListener("click", render);

//Garbage code, should be changed later


//async function getBooks () {  
//    const response = fetch("https://api.adviceslip.com/advice/search/${form.value}");
//    return response.advice;
//};

async function fetchText() {
    if(pageNum === 0){
        try{
            let response = await fetch(`https://api.adviceslip.com/advice/search/${document.getElementById('box').value}`);
            let data = await response.json();
            return data;
        } catch (error) {
            return console.log(error);
        }
    }else if (pageNum === 1){
        try{
            let response = await fetch(`https://api.adviceslip.com/advice/${document.getElementById('box').value}`);
            let data = await response.json();
            return data;
        } catch (error) {
            return console.log(error);
        }
    }else{
        try{
            let response = await fetch(`https://api.adviceslip.com/advice`);
            let data = await response.json();
            return data;
        } catch (error) {
            return console.log(error);
        }
    }
}

function getHTML(advice){
    if(pageNum === 0){
        return`
        <div class="card" style="margin-bottom: 50px">
        <div class="card-body">
        <h5 class="card-title">${advice.date}</h5>
        <p class="card-text">${advice.advice}</p>
        </div>
        </div>`}else if(pageNum === 1){
            return `<div class="card" style="margin-bottom: 50px">
            <div class="card-body">
            <p class="card-text">${advice.advice}</p>
            </div>
            </div>`
        }
        else if(pageNum === 2){
            return `<div class="card" style="margin-bottom: 50px">
            <div class="card-body">
            <p class="card-text">${advice.advice}</p>
            </div>
            </div>`
        }
    }





async function render(){
    if(pageNum === 0){
        const List = await fetchText(); 
        let html = List.slips.map(x=> getHTML(x)).join('');
        let el = document.getElementById('Grid');
        el.innerHTML = html;
    }else if(pageNum === 1){
        const List = await fetchText(); 
        let html = getHTML(List.slip);
        let el = document.getElementById('Grid');
        el.innerHTML = html;
    }else if(pageNum === 2){
        const List = await fetchText(); 
        let html = getHTML(List.slip);
        let el = document.getElementById('Grid');
        el.innerHTML = html;
    }
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

function backgroundIMG() {
    if(pageNum === 0){
        topBar.style.backgroundImage = 'https://wallpapersmug.com/large/da140e/green-leaf-dense-big.jpg';
    }
}

// function pageTest(){
//     if(pageNum != 2){
//         document.getElementById('inner').innerHTML = `<form id="frm1" action="#">
//         Query: <input type="text" name="query" id="box"><br>
//       </form>
//       <button type="button" id="btn">Submit</button>`
//     }
//     if(pageNum === 2){
//         document.getElementById('inner').innerHTML = `<button type="button" id="btn">Try your luck!</button>`
//     }}

function pageHide(){
    document.getElementById("Grid").innerHTML = ``;
    if(pageNum === 2){
        document.getElementById("inner").style.display = "none"
    }else{
        document.getElementById("inner").style.display = "flex"
    }
    
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        render();
    }
}

