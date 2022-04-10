console.log("hello");

shownotes();
let addnote=document.getElementById("addbtn");

addnote.addEventListener("click",add);

let area=document.getElementById("addtxt");
let title=document.getElementById("addtitle");
// console.log(title);

function add(){
    let note=localStorage.getItem("note");
    let ttl=localStorage.getItem('title');

    let noteobj;
    let notetitle;
    if(note==null){
        noteobj=[];
        notetitle=[];
    }
    else{
        console.log(note);
        console.log(typeof note);
        noteobj=JSON.parse(note);
        notetitle=JSON.parse(ttl);
        console.log(noteobj);
        console.log(typeof noteobj)
    }

    notetitle.push(title.value);
    noteobj.push(area.value);

    localStorage.setItem("note",JSON.stringify(noteobj));
    localStorage.setItem("title",JSON.stringify(notetitle));

    area.value="";
    title.value="";

    // console.log(noteobj);
    shownotes();
}

function shownotes(){
    let notes=localStorage.getItem("note");
    let ttl=JSON.parse(localStorage.getItem("title"));

    let dvshow=document.getElementById("showarea");
    if(notes==null || notes==[]){
        dvshow.innerHTML="<h4>Noting to show</h4>";
    }
    else{
        noteobj=JSON.parse(notes);
        let html="";
        noteobj.forEach(function(element,index) {
            html+=`
            <div  class="noteCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${ttl[index]}</h5>
                  <p class="card-text">${element}</p>
                  <button id=${index} onclick="deletefunction(this.id)" class="btn btn-primary">delete</button>
                </div>
              </div>
            `;
        });
        dvshow.innerHTML=html
    }
}

function deletefunction(i){
    let del=document.getElementById(`${i}`);
    
    let notesobj=JSON.parse(localStorage.getItem("note"));
    let notestitleobj=JSON.parse(localStorage.getItem("title"));

    notesobj.splice(i,1);
    notestitleobj.splice(i,1);

    localStorage.setItem("title",JSON.stringify(notestitleobj));
    localStorage.setItem("note",JSON.stringify(notesobj));
    shownotes();

    // console.log(notesobj);
}

let search = document.getElementById('serachtxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
