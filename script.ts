const register : HTMLFormElement | null= document.querySelector('.register');
const register_text:HTMLInputElement | null | undefined = register?.querySelector('#register_text');
const list:any = document.querySelector('.list');

const TODOS_KEY = 'todos';

let todos:any = [];

class Todo {
  text: string;
  id: number;
  check: boolean;
  constructor(text: string,
    id: number,
    check: boolean) {
      this.text = text;
      this.id = id;
      this.check = check;
    }
}

//localStorage에 넣는 것
function saveTodos():void {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function insertTodo(newTodo: Todo) {
  console.log(todos);
  const li = document.createElement('li');
  const input = document.createElement('input');
  const span = document.createElement('span');
  input.id = <string><unknown>newTodo.id;
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

function checkEnd(event: MouseEvent) {
  let myInput = <HTMLInputElement>event.target;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == myInput.id) {
      todos[i].check = myInput.checked;
      (<HTMLElement>myInput.parentNode).classList.toggle('checked');
      break;
    }
  }
  saveTodos();
}

function handleTodoSubmit(event: { preventDefault: () => void; }) {
  event.preventDefault();
  const newTodo: string = <string>register_text?.value;
  const newTodoObj = new Todo(
    newTodo,
    Date.now(),
    false
  );
  (<HTMLInputElement>register_text).value = '';
  todos.push(newTodoObj);
  insertTodo(newTodoObj);
  saveTodos();
}

register?.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  todos.forEach(insertTodo);
}