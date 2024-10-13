const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

//  Getting data from localstorage

document.addEventListener('DOMContentLoaded', loadTask);

function loadTask(){
    const tasks =  getTasksFromLocalStrorage();

    tasks.forEach(task => {
        addTaskToDom(task);
    })
}



//  Adding Sumbit

todoForm.addEventListener("submit", addTask);

// Function to add task
function addTask(e){
    e.preventDefault();

    const taskText = todoInput.value.trim();

     if(taskText !== ''){
        const task = {
            id : Date.now(),
            text : taskText,
            completed :false
        }
        // Adding to Dom
        addTaskToDom(task);
        saveToLocalStorage(task);

        // Clear input field
        todoInput.value = '';

    }




}


// Function to add task to DOM
function addTaskToDom(task){

    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ""}`;
    li.dataset.id = task.id;
    li.innerHTML = `
      <input type="checkbox" class="complete-checkbox" ${task.completed? "checked" : ""}>
            <span class="task">${task.text}</span>
            <button class="edit-btn">Edit </button>
            <button class="delete-btn">Delete</button>
    `
  
    todoList.appendChild(li);

    attachEventListeners(li, task);
}


// Function to attach event listeners
function attachEventListeners(li, task){
  let  deleteBtn = li.querySelector('.delete-btn');
  let editBtn = li.querySelector('.edit-btn');
  let checkbox = li.querySelector('.complete-checkbox');

deleteBtn.addEventListener('click',function(){
handleDelete(task.id, li); 

});

editBtn.addEventListener('click', function(){
    handleEdit(task.id, li);
});

checkbox.addEventListener('change', function(){
    console.log('checkbox changed', checkbox.checked);
    toggleTaskCompletion(task.id, li, checkbox.checked);

})

}

//  Handle delete
function handleDelete(id, li){

    let tasks = getTasksFromLocalStrorage();

    tasks = tasks.filter(task => task.id != id);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    li.remove();
     

}

//  HAndle Edit

function handleEdit(taskId, li){

    let taskSpan = li.querySelector('.task');
  
    let newTaskText = prompt('Enter new task', taskSpan.textContent);
 
    if(newTaskText !== null && newTaskText.trim() !== ''){

        // Update localstorage
        updateTask(taskId, newTaskText);

        //  update DOM
        taskSpan.textContent = newTaskText;
    }



}

//  Check box checking
function toggleTaskCompletion(taskId, li, isCompeleted) {

    const tasks = getTasksFromLocalStrorage();

    const task = tasks.find(task => task.id === taskId);

    if(task){
        task.completed = isCompeleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        li.classList.toggle('completed', isCompeleted);
    }

}

// update localstorage
function updateTask(taskId, newTaskText){
    const tasks = getTasksFromLocalStrorage();
    const task = tasks.find(task => task.id == taskId);
    
    if(task){
        task.text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// save localstorage

function saveToLocalStorage(task){

    const oldTasks =JSON.parse( localStorage.getItem('tasks')) || [];
    oldTasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(oldTasks));
}

function getTasksFromLocalStrorage(){
    const oldTasks =JSON.parse( localStorage.getItem('tasks')) || [];
    return oldTasks;

}