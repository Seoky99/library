let myLibrary = [];

//Book Constructor
function Book(author, title, numPages, beenRead) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.beenRead = beenRead; 
    this.id = crypto.randomUUID(); 
}

Book.prototype.toggleMe = function() {
    this.beenRead = !this.beenRead; 
}

function addBookToLibrary(author, title, numPages, beenRead) {
    let book = new Book(author, title, numPages, beenRead); 
    myLibrary.push(book); 
}

/*
    Creates a card for a child that has properties depending on 
    its Book values. 
*/
function createChild(elt) {
    let item = document.createElement("div");
    item.classList.add("card"); 
    item.setAttribute("data-id", elt.id);

    children = [];

    let header = document.createElement("h1"); 
    header.innerHTML = elt.title; 
    children.push(header); 

    let para = document.createElement("p");
    para.innerHTML = `Written by ${elt.author}`; 
    children.push(para); 

    let para2 = document.createElement("p");
    para2.innerHTML = `${elt.numPages} pages`; 
    children.push(para2); 

    let beenRead = document.createElement("p"); 
    beenRead.innerHTML = elt.beenRead ? "Read" : "Not read"; 
    beenRead.id = "beenRead";
    children.push(beenRead); 

    let deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "delete me"; 
    deleteButton.id = "delete";
    children.push(deleteButton);
   
    let toggleButton = document.createElement("button"); 
    toggleButton.innerHTML = "toggle me"; 
    toggleButton.id = "toggle";
    children.push(toggleButton);

    children.forEach((child) => item.appendChild(child));
    return item; 
}

/*
    Replaces the entire container and displays everything currently in Library.
*/
function addToDisplay() {
    let oldCardContainer = document.querySelector(".card-container");
    let newCardContainer = document.createElement("div");
    newCardContainer.className = "card-container";
    oldCardContainer.parentNode.replaceChild(newCardContainer, oldCardContainer);

    myLibrary.forEach( (elt) => {
        let item = createChild(elt);
        newCardContainer.appendChild(item);
    })
}

/*
    Simply appends a child to the display 
*/
function addOne(elt) {
    let cardContainer = document.querySelector(".card-container");
    cardContainer.appendChild(createChild(elt));
}

/*
    Adds a book into the Library after the form is submitted and modifies display 
*/
function formSubmit() {

    let form = document.querySelector("form"); 
    form.addEventListener("submit", (e) => {

        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = [...formData.entries()];

        const addBook = new Book(data[1][1], data[0][1], data[2][1], data.length === 4);

        myLibrary.push(addBook);
        addOne(addBook);
    })
}

/*
    Handles buttons in child cards to delete or toggle beenRead
*/
function clickChild() {
    let parent = document.querySelector(".card-container");

    parent.addEventListener("click", (e) => {
        if (e.target.matches('button') && e.target.id === "delete") {
            let id = e.target.parentElement.getAttribute("data-id");
            myLibrary = myLibrary.filter(elt => elt.id !== id);
            parent.removeChild(document.querySelector(`.card[data-id="${id}"]`));
        } else if (e.target.matches('button') && e.target.id === "toggle") {
            let id = e.target.parentElement.getAttribute("data-id");
            myLibrary.forEach(elt => {
                if (elt.id === id) {
                    elt.toggleMe(); 
                    let beenReadP = document.querySelector(`.card[data-id="${id}"] p#beenRead`); 
                    beenReadP.innerHTML = elt.beenRead ? "Read" : "Not read";  
                }
            })
        }
    }) 
}

addToDisplay();
formSubmit();
clickChild();

