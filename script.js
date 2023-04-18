const todoList = document.querySelector(".todo-list");
const newTodoInput = document.querySelector("#new-todo-input");
const newTodoBtn = document.querySelector("#new-todo-btn");
const itemsLeft = document.querySelector("#items-left-span");
const todoFilterBtns = document.querySelectorAll(".todo-filter-btn");
const clearCompletedBtn = document.querySelector("#todo-clear-completed-btn");
let todos = [];
let items = 0;
class todoItem{
    constructor(text){
        this.text = text;
        this.completed = false;
        this.deleted = false;
        this.todoItem = document.createElement("li");
    }
    makeNewTodoElement(){
        items++;
        itemsLeft.innerText = items+" items left";
        this.todoItem.classList.add("todo-item");
        let todoCompleteBtn = document.createElement("button");
        todoCompleteBtn.classList.add("todo-complete-btn");
        let todoCompleteIcon = document.createElement("i");
        todoCompleteIcon.classList = "fa-sharp fa-solid fa-check";
        todoCompleteBtn.appendChild(todoCompleteIcon);
        todoCompleteBtn.addEventListener("click", ()=>{
            this.todoItem.classList.toggle("completed");
            this.completed ? this.completed = false : this.completed = true;
        });
    
        let todoTextInput = document.createElement("input");
        todoTextInput.type = "text";
        todoTextInput.name = "todo-text";
        todoTextInput.readOnly = true;
        todoTextInput.value = this.text;
        todoTextInput.classList = "todo-text";
    
        let todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.classList.add("todo-delete-btn");
        let todoDeleteIcon = document.createElement("i");
        todoDeleteIcon.classList = "fa-sharp fa-solid fa-xmark";
        todoDeleteBtn.appendChild(todoDeleteIcon);
        todoDeleteBtn.addEventListener("click", ()=>{
            this.deleted = true;
            todoList.removeChild(this.todoItem);
            todos.filter(todo=>todo.deleted===false);
            items--;
            itemsLeft.innerText = items+" items left";
        });
        this.todoItem.appendChild(todoCompleteBtn);
        this.todoItem.appendChild(todoTextInput);
        this.todoItem.appendChild(todoDeleteBtn);
        todoList.appendChild(this.todoItem);
        todos.push(this);
    }
}
newTodoBtn.addEventListener("click", ()=>{
    newTodoInput.value != "" ? new todoItem(newTodoInput.value).makeNewTodoElement() : "";
    newTodoInput.value = "";
}); 
todoFilterBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        todoFilterBtns.forEach(btn=>btn.classList.remove("active"));
        todos.forEach(todo=>todo.todoItem.classList.remove("hide"));
        btn.classList.add('active');
        switch (btn.innerText) {
            case "Active":
                let completedTodos = todos.filter(todo=>todo.completed===true);
                completedTodos.forEach(todo=>todo.todoItem.classList.add("hide"));
                break;
            case "Completed":
                let activeTodos = todos.filter(todo=>todo.completed===false);
                activeTodos.forEach(todo=>todo.todoItem.classList.add("hide"));
                break
            default:
                todos.forEach(todo=>todo.todoItem.classList.remove("hide"));
                break;
        }
        items = todos.filter(todo=>todo.todoItem.classList.contains("hide")===false).length;
        itemsLeft.innerText = items+" items left";
    })
})
clearCompletedBtn.addEventListener("click", ()=>{
    let completedTodos = todos.filter(todo=>todo.completed===true);
    completedTodos.forEach(todo=>todoList.removeChild(todo.todoItem));
    todos = todos.filter(todo=>todo.completed === false);
    items = todos.length;
    itemsLeft.innerText = items+" items left";
})