// selecting all the button for events
const newBtn = document.querySelector('#btn-new');
const popupForm = document.querySelector('#popup-form');
const closeForm = document.querySelector('#btn-exit');
const addBookBtn = document.querySelector('#btn-add');
const display = document.querySelector('#display');


// adding event to the buttons
// the new book button popup form
newBtn.addEventListener('click',()=>{
    popupForm.style.display = 'block';
})
closeForm.addEventListener('click',()=>{
    popupForm.style.display ='none';
})

addBookBtn.addEventListener('click',()=>{    
    if(addBook()==false) return;
    popupForm.style.display ='none';
})
function setData() {
    localStorage.setItem("Library", JSON.stringify(myLibrary));
}
function getData() {
    myLibrary = JSON.parse(localStorage.getItem("Library"));
}
let myLibrary = [];
if(localStorage.Library){
    getData();
}
function addBook() {
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const pages = document.querySelector('#book-pages').value;
    const read = document.querySelector('#book-read');
    
    if(title== false|| author==false || pages==false){
        alert('enter you book information');
        return false ;// stop event from runing
    }
    let readBook ;
    if(read.checked == true){
        readBook = true;
    }else if (read.checked == false){
        readBook = false;
    }
    const newBook = new Book( title, author, pages, readBook);
    myLibrary.push(newBook);
    setData();
    displayBook(newBook);
}
// the book class constructor
class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}
function displayBook(book){
    const div = document.createElement('div');
    const readBtn = document.createElement('button');
    const deletBtn = document.createElement('button');
    readBtn.setAttribute('class', 'button');
    deletBtn.setAttribute('class', 'button btn-delete');
    if(book.read == true){
        readBtn.innerText = 'Read';
        readBtn.style.backgroundColor = 'blue';
    }else if (book.read == false){
        readBtn.innerText = 'Unread';
        readBtn.style.backgroundColor = 'red';
    }
    
    readBtn.addEventListener('click', ()=>{
        if(book.read == true){
            book.read = false;
            readBtn.innerText = 'Unread';
            readBtn.style.backgroundColor = 'red';
        }else if(book.read == false){
            book.read = true;
            readBtn.innerText = 'Read';
            readBtn.style.backgroundColor = 'blue';
        }
        setData();
    })
    deletBtn.innerText = 'delete';
    div.setAttribute('class','book');
    div.innerHTML = `<p>${book.title}</p><p>by: ${book.author}</p><p>Number of pages ${book.pages} pg</p>`;
    deletBtn.addEventListener('click', (e)=>{
        e.target.parentElement.remove();
        myLibrary.splice(myLibrary.indexOf(book),1);
        setData();
    })
    div.appendChild(readBtn);
    div.appendChild(deletBtn);
    display.appendChild(div);
}

for(let i=0;i<myLibrary.length;i++){
    displayBook(myLibrary[i]);
}