const taskInput=document.getElementById("taskInput");
const  addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const error=document.getElementById("error");

taskInput.addEventListener("keypress",function (e){
    if(e.key==="Enter"){
        addBtn.click();
    }

})
function saveTasks(tasks){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
function loadTask(){
    return JSON.parse(localStorage.getItem("tasks"))||[];
}
function renderTasks(){
    taskList.innerHTML="";
    let tasks=loadTask();
    tasks.forEach(function (task,index){
        let li=document.createElement("li");
        li.textContent=task.text;
        if(task.done){
            li.classList.add("done")
        }
        let actions=document.createElement("div");
        let doneBtn=document.createElement("button");
        doneBtn.textContent="Done";
        doneBtn.classList.add("done");
        doneBtn.addEventListener("click",function () {
            tasks[index].done=!tasks[index].done;
            saveTasks(tasks);
            renderTasks();


        })
        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", function (){
            tasks.splice(index,1);
            saveTasks(tasks);
            renderTasks();
        })
        actions.appendChild(doneBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);
        taskList.appendChild(li);

    })
}
addBtn.addEventListener("click", function () {
    let taskText=taskInput.value;

    if(taskText===""){
        error.textContent="Enter a task!";
        return;
    }
    error.textContent="";

   let tasks=loadTask();
   tasks.push({
       text:taskText,
       done:false
   })
    saveTasks(tasks);
   renderTasks();
   taskInput.value="";
});
renderTasks();


