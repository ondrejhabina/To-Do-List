const submitButton = document.querySelector('.submit-but');
const resetBut = document.querySelector('.reset-but');
const todoList = document.querySelector('.todo-list');
const firstTodo = document.getElementById('example-todo');
const firstCloseToDo = document.querySelector('.close-todo');

firstCloseToDo.addEventListener('click', () => {
    firstCloseToDo.parentNode.remove();
})

submitButton.addEventListener('click', function() {
    submitTodo();
});

resetBut.addEventListener('click', reset);

//to register enter as submit button click
document.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        submitTodo();
    }
})

function createTodo(input) {
    let todo = document.createElement('li');
    let closeButton = document.createElement('button');
    let closeButImg = document.createElement('img');

    //adding classes and appending elements appropriately
    todo.innerHTML = input;
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


function submitTodo() {
    let userInput = document.getElementById('input-todo').value;
    if(userInput.length == 0) {
        alert('You did not input anything.')
    } else if(userInput.length > 0) {
        let madeTodo = createTodo(userInput);
        todoList.appendChild(madeTodo);
        firstTodo.remove();
        document.getElementById('input-todo').value = "";
    }  
}

function reset() {
    todoList.replaceChildren();
}
