const submitButton = document.querySelector('.submit-but');
const resetBut = document.querySelector('.reset-but');
const todoList = document.querySelector('.todo-list');
const firstTodo = document.getElementById('example-todo');
const firstCloseToDo = document.querySelector('.close-todo');

//event listeners

firstCloseToDo.addEventListener('click', () => {
    firstCloseToDo.parentNode.remove();
})

submitButton.addEventListener('click', function() {
    submitTodo();
});

resetBut.addEventListener('click', reset);

document.addEventListener('DOMContentLoaded', storageUnpack);

//to register enter as submit button click
document.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        submitTodo();
    }
})

//functions

function createTodo(input) {
    let todo = document.createElement('li');
    let closeButton = document.createElement('button');
    let closeButImg = document.createElement('img');

    //setting up local storage
    todo.innerHTML = input;
    let todoText = todo.innerHTML;
    let todoKey = String(todoList.children.length); //elegant way to assign a key to the local storage item, index based hence + 1
    
    //determine if we are calling the func for creation or rebuilding from local storage
    if (localStorage.getItem(todoKey) === null) {
        storeTodo(todoKey ,todoText);
    } 
       
    //adding classes and appending elements appropriately
    closeButImg.src = 'red cross.png';
    closeButImg.classList.add('cross-img-red');
    closeButton.classList.add('close-todo');
    closeButton.appendChild(closeButImg);
    todo.classList.add('to-do');
    todo.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
        closeButton.parentNode.remove();
    })
    return todo;
} 

function submitTodo(storageInput) {
    let userInput = document.getElementById('input-todo').value;
    if (storageInput !== undefined) { 
        userInput = storageInput;
    }    
    if(userInput.length == 0) {
        alert('You did not input anything.')
    } else if(userInput.length > 0) {
        firstTodo.remove(); //needs to happen before todo creation or it will cause bugs with local storage
        let madeTodo = createTodo(userInput);
        todoList.appendChild(madeTodo);
        document.getElementById('input-todo').value = "";
    }  
}

function reset() {
    todoList.replaceChildren();
    localStorage.clear(); 
}

// local storage setup and rebuilding todos from storage

function storeTodo(key ,value) {
    let keyString = key.toString();
    let valString = value;   
    localStorage.setItem(keyString, valString);
}

function storageUnpack() {
    if (localStorage.length !== 0) {
        for(let i = 0; i < localStorage.length; i++) { //loop through local storage and create todos
            let storageItem = localStorage.getItem(String(i));
            submitTodo(storageItem);            
        }
    }
}