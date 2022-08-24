var register = document.querySelector('.register');
var register_text = register.querySelector('#register_text');
var list = document.querySelector('.list');
var TODOS_KEY = 'todos';
var todos = [];
//localStorage에 넣는 것
function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
function insertTodo(newTodo) {
    console.log(todos);
    var li = document.createElement('li');
    var input = document.createElement('input');
    var span = document.createElement('span');
    input.id = newTodo.id;
    input.addEventListener('click', checkEnd);
    if (newTodo.check) {
        input.checked = true;
        li.classList.toggle('checked');
    }
    span.innerText = newTodo.text;
    input.type = 'checkbox';
    li.appendChild(input);
    li.appendChild(span);
    list.prepend(li);
}
function checkEnd(event) {
    var myInput = event.target;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == myInput.id) {
            todos[i].check = myInput.checked;
            myInput.parentNode.classList.toggle('checked');
            break;
        }
    }
    saveTodos();
}
function handleTodoSubmit(event) {
    event.preventDefault();
    var newTodo = register_text.value;
    var newTodoObj = {
        text: newTodo,
        id: Date.now(),
        check: false
    };
    register_text.value = '';
    todos.push(newTodoObj);
    insertTodo(newTodoObj);
    saveTodos();
}
register.addEventListener('submit', handleTodoSubmit);
var savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos) {
    var parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    todos.forEach(insertTodo);
}
