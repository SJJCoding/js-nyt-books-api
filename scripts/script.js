

function getHTML(advice){
    return`
    <div class="card" style="width: 18rem;" style="margin-bottom: 50px">
    <div class="card-body">
    <h5 class="card-title">${advice.date}</h5>
    <p class="card-text">${advice.advice}</p>
    </div>
    </div>`
}
6
async function buildBooks(){
    const List = fetchText(); 
    let html = List.map(x=> getHTML(x)).join('');
    let el = document.getElementById('bookGrid');
    el.innerHTML = html;
}

buildBooks();
