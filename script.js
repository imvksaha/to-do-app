document.addEventListener('DOMContentLoaded', () => {


   const inputTask = document.getElementById('input-task');
   const addBtn = document.getElementById('add-btn');
   const toDoList = document.getElementById('todo-list');
   
   //make task array to store it and also get item when page loaded into the array
   let tasks = JSON.parse(localStorage.getItem('tasks')) ||[] 

    tasks.forEach(task => renderTask(task));


   addBtn.addEventListener('click', () => {
    const taskText = inputTask.value.trim();
    //console.log(taskText);
    if(taskText === "") return;
    
    //make each new task object after a entry with three key and value
    const newTask = {    
        id: Date.now(),
        text: taskText,
        completed : false,
    }

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    inputTask.value = ""; //clear the input box
    console.log(tasks);
    
   })

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `
        const span = li.querySelector('span');
        const dlt = li.querySelector('button');
        span.addEventListener('click', ()=>{
            task.completed = !task.completed;
            span.classList.toggle('completed');
            saveTask();

        })
        dlt.addEventListener('click', (e)=>{
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTask();
        })

        toDoList.appendChild(li);


    }

    function saveTask() {
     localStorage.setItem('tasks', JSON.stringify(tasks))
   }
})