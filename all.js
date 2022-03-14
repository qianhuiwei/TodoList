// an array of all tasks
let data = [];

// get DOM elements
const input = document.querySelector(".input-field");
const btnAddTask = document.querySelector(".btn-add-task");
const tasks = document.querySelector(".task-list");
const tabAll = document.querySelector(".tab-all");
const tabTodo = document.querySelector(".tab-todo");
const tabDone = document.querySelector(".tab-done");
const todoNum = document.querySelector(".todo-num");
const taskList = document.querySelector(".task-list");
const btnCancel = document.querySelector(".btn-cancel");
const btnClear = document.querySelector(".btn-clear");

/* add event listeners */
input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

btnAddTask.addEventListener("click", addTask);

tabAll.addEventListener("click", function () {
    tabAll.classList.add("active");
    tabTodo.classList.remove("active");
    tabDone.classList.remove("active");
    showAllTasks();
});

tabTodo.addEventListener("click", function () {
    tabAll.classList.remove("active");
    tabTodo.classList.add("active");
    tabDone.classList.remove("active");
    showTodo();
});

tabDone.addEventListener("click", function () {
    tabAll.classList.remove("active");
    tabTodo.classList.remove("active");
    tabDone.classList.add("active");
    showDone();
});

tasks.addEventListener("click", function (e) {
    const target = e.target.getAttribute("class");
    if (target === "btn-cancel") {
        deleteListItem(e);
    }

    if (target === "checkbox" || target === "check-mark") {
        changeStatus(e);
    }
});

btnClear.addEventListener("click", clearDone);


/* Helper functions */

// function that adds a task when user click on the add button or hit enter key
function addTask() {
    if (input.value === "") {
        alert("Please enter a task");
        return;
    }
    const obj = {
        content: input.value.trim(),
        status: false, // default a new task to be not done
    };
    data.push(obj);
    showAllTasks();
    tabAll.classList.add("active");
    tabTodo.classList.remove("active");
    tabDone.classList.remove("active");
    input.value = "";
}

// function that shows the total number of how many todo tasks
function showTodoNum() {
    let count = 0;
    data.forEach(function (item) {
        if (!item.status) {
            count++;
        }
    })
    todoNum.textContent = `${count} 個待完成項目`;
}

// function that shows all tasks (including todo and done)
function showAllTasks(e) {
    tasks.innerHTML = "";
    let listContent = "";
    data.forEach(function (item, index) {
        if (!item.status) {
            listContent += `<li class="list-item"><div class="list-item-checkbox"><input type="checkbox" class="checkbox" data-id=${index}><p class="list-item-content">${item.content}</p></div><img class="btn-cancel" data-id=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="btn-cancel"></li>`;
        } else if (item.status) {
            listContent += `<li class="list-item"><div class="list-item-checkbox"><span class="check-mark" data-id=${index}>&#10004;</span><p class="list-item-content-checked">${item.content}</p></div><img class="btn-cancel" data-id=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="btn-cancel"></li>`;
        }
    });
    tasks.innerHTML = listContent;
    showTodoNum();
}

// function that shows all todo tasks (not including done tasks)
function showTodo() {
    tasks.innerHTML = "";
    let listContent = "";
    data.forEach(function (item, index) {
        if (!item.status) {
            listContent += `<li class="list-item"><div class="list-item-checkbox"><input type="checkbox" class="checkbox" data-id=${index}><p class="list-item-content">${item.content}</p></div><img class="btn-cancel" data-id=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="btn-cancel"></li>`;
        }
    });
    tasks.innerHTML = listContent;
    showTodoNum();
}

// function that shows all done tasks (not including todo tasks)
function showDone() {
    tasks.innerHTML = "";
    let listContent = "";
    data.forEach(function (item, index) {
        if (item.status) {
            listContent += `<li class="list-item"><div class="list-item-checkbox"><span class="check-mark" data-id=${index}>&#10004;</span><p class="list-item-content-checked">${item.content}</p></div><img class="btn-cancel" data-id=${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="btn-cancel"></li>`;
        }
    });
    tasks.innerHTML = listContent;
    showTodoNum();
}

// function that shows content that is corresponded with the active tab
function showActiveTab() {
    if (tabDone.classList.contains("active")) {
        showDone();
    } else if (tabTodo.classList.contains("active")) {
        showTodo();
    } else {
        showAllTasks();
    }
}

// function that deletes a task by its id
function deleteListItem(e) {
    const deleteId = e.target.getAttribute("data-id");
    data.splice(deleteId, 1);
    showActiveTab();
}

// function that changes task's status (todo -> done / done -> todo)
function changeStatus(e) {
    const index = e.target.getAttribute("data-id");
    if (!data[index].status) {
        data[index].status = true;
        showActiveTab();
    } else {
        data[index].status = false;
        showActiveTab();
    }
}

// function that deletes all done tasks
function clearDone() {
    let newData = [];
    data.forEach(function (item) {
        if (!item.status) {
            newData.push(item);
        }
    });
    data = newData;
    showActiveTab();
}

/* init todo list when the page is loaded 
   (by default we want to show all the tasks,
    including bothe todo tasks and done tasks) */
showAllTasks();