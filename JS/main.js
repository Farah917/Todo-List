var input = document.getElementById('input');
var insert = document.getElementById('insert');
var values= document.getElementById('values')
var loading=document.getElementById('loading')
var none = document.getElementById('none')

insert.addEventListener('click', function() {
    let task= {
        title:input.value,
        apiKey:"67a02ef760a208ee1fdf00b6"
    }
    if (task.title.trim() == "") { 
        none.innerHTML = `"title" is not allowed to be empty`;
    } else {
      none.style.display = "none";
    }
    addTodo(task) 
});

// Add Data
async function addTodo(task) {
    var data = await fetch('https://todos.routemisr.com/api/v1/todos', { 
        method: 'POST',  
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
    });
    var result = await data.json()
    if(result.message=='success'){
        getTodo() 
        clearInputs()
    }
}

// Clearing Input
function clearInputs(){
    input.value=""
}

// Get Data
async function getTodo() {
    loading.style.display='block'
    values.style.display='none'
    var data = await fetch('https://todos.routemisr.com/api/v1/todos/67a02ef760a208ee1fdf00b6',);
    var result = await data.json()
    console.log(result)
    if(result.message=='success'){
        loading.style.display='none'
        values.style.display='block'
        display(result.todos)
    }
}
getTodo()

// Delete Data
async function deleteTodo(id) {
    var data = await fetch('https://todos.routemisr.com/api/v1/todos', { 
        method: 'DELETE',  
        body: JSON.stringify({todoId:id}),
        headers: { 'Content-Type': 'application/json' }
    });
    var result = await data.json()
    if(result.message=='success'){
        getTodo() 
    }
}

// Mark Data
async function markTodo(id) {
    var data = await fetch('https://todos.routemisr.com/api/v1/todos', { 
        method: 'PUT',  
        body: JSON.stringify({todoId:id}),
        headers: { 'Content-Type': 'application/json' }
    });
    var result = await data.json()
    if(result.message=='success'){
        getTodo() 
    }
}

// Displaying Function
function display(data){
    var cartona=""
    if (data.length == 0) {
        document.querySelector('.alltasks-title').textContent = "No Tasks";
    }else{
        document.querySelector('.alltasks-title').textContent = "All Tasks";
    }

    for (let i = 0; i < data.length; i++) {
        cartona+=`
        <div class="alltasks d-flex justify-content-between rounded-4 mb-3 p-3 ${data[i].completed ? 'bg-danger' : ''} ">
            <div class="text d-flex align-items-center">
                <span class="text-white ps-3 fs-6 ${data[i].completed ? 'text-decoration-line-through' : ''}">${data[i].title}</span>   
            </div>
            <div class="logos d-flex align-items-center text-black"> 
                <i onclick="markTodo('${data[i]._id}')" class="fa-solid fa-check-circle ${data[i].completed ? 'd-none' : ''}"></i>
                <i onclick="deleteTodo('${data[i]._id}')" class="fa-solid fa-trash ps-4 pe-3"></i>
            </div>
        </div> 
        ` 
    }
    values.innerHTML=cartona
}