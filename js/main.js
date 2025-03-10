// count initial ToDo
countTodos();

addEventListener("DOMContentLoaded", loadTasks())


// capture click event
document.getElementById('checkAll').addEventListener('click', function(){
    AllDone();
});

//capture enter key press
document.getElementById('todo-to-add').addEventListener('keypress',function (e) {
      e.preventDefault // Do not submit form
      if (e.which == 13) { // check if enter is pressed
        var todo = document.getElementById('todo-to-add').value;
        console.log(todo);
        addToDo(todo);
      }
});

// capture click event
document.getElementById('addTODO').addEventListener('click',function () {
    var todo = document.getElementById("todo-to-add").value;
    console.log(todo);
    addToDo(todo);
});


var todos = document.querySelectorAll('#sortable li input[type="checkbox"]');
for (var i = 0; i < todos.length; i++) {
    todos[i].addEventListener('change',function(){
        if(this.checked == true){
            var doneItem = this.parentElement.innerText
            console.log('done item: ' +doneItem);
            done(doneItem);
            countTodos();
        }
    });
}

// capture click event on button minus on Already Done 
var already_done_elements = document.getElementsByClassName("remove-item");
for (var i = 0; i < already_done_elements.length; i++) {
    already_done_elements[i].addEventListener('click',function(){
        console.log(this);
        removeItem(this.parentElement);
    });
}

// add new todo
function addToDo(todo){
    createTodo(todo); 
    saveTasks()
    countTodos();
}

// count tasks (To Complete)
function countTodos(){
    let ulElem = document.getElementById("sortable")
    let todos = ulElem.children.length;
    
    let itemsLeft = document.getElementsByClassName("count-todos")

    itemsLeft[0].innerHTML = "Items Left: " + todos;
}

//create task (To Complete)
function createTodo(text){
    let ulElem = document.getElementById("sortable")
    let li = document.createElement("li");
    li.className = "ui-state-default";

    let div = document.createElement("div");
    div.className = "checkbox";
    let label = document.createElement("label");

    let input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener('change',function(){
        if(this.checked == true){
            var doneItem = this.parentElement.innerText
            console.log('done item: ' +doneItem);
            done(doneItem);
            li.remove();
            countTodos();
        }
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(text));

    div.appendChild(label);
    li.appendChild(div);
    ulElem.appendChild(li);
}

//mark task as done (To Complete)
function done(doneItem){
    let ulElem = document.getElementById("done-items")
    let li = document.createElement("li");
    let button = document.createElement("button");
    let span = document.createElement("span");
    span.className = "fa fa-minus-square";
    button.className = "remove-item btn btn-default btn-xs pull-right";
    button.appendChild(span);
    button.addEventListener('click',function(){
        console.log(this);
        removeItem(this.parentElement);
    });
    li.appendChild(document.createTextNode(doneItem));
    li.appendChild(button);
    ulElem.appendChild(li);

    let todos = document.querySelectorAll("#sortable li");
    for(let i = 0; i < todos.length; i++){
        let label = todos[i].querySelector("label");
        if(label && label.innerText.trim() === doneItem.trim()){ 
            todos[i].remove();
            break;
        }
    }
}

//mark all tasks as done (To Complete)
function AllDone(){
    let ulElem = document.getElementById("sortable")
    let todos = Array.from(ulElem.children);

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let input = todo.querySelector("input");
        input.checked = true;
    }

    for (let i = 0; i<todos.length; i++) {
        done(todos[i].innerText);
    }

    for (let i =  todos.length-1;i>=0; i--) {
        removeItem(todos[i]);
    }

    saveTasks()
    countTodos();
}

//remove done task from list (To Complete)
function removeItem(element){
    element.remove(); 
}

function saveTasks(){
    let tasks = [];
    let li = document.querySelectorAll('#sortable li');

    for(let i = 0; i < li.length; i++){
        tasks.push(li[i].innerText);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let ulElem = document.getElementById("sortable");
    ulElem.innerHTML = "";

    for(let i = 0; i < tasks.length; i++){
        createTodo(tasks[i]);
    }

    countTodos();
}