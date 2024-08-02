let inputBox = document.getElementById('input-task');
let addIcon = document.getElementById('add-btn');
let taskContainer = document.getElementById('task-container');

window.onload = loadData;


function displayAdd() {
    if (inputBox.value && inputBox.value.length > 0) {
        addIcon.src = './plus-solid.svg';
    }
    else {
        addIcon.src = '';
    }
}


function addTask() {
    if (inputBox.value) {

        let newTask = createTaskElement(inputBox.value, false);
        taskContainer.append(newTask);
        inputBox.value = '';
        saveTasks();
    }
}

function keyEvent(event) {
    if (event.key === 'Enter') {
        console.log(event)
        addTask();
    }
}


function createTaskElement(taskList, isChecked) {

    let newTask = document.createElement('LI');
    let options = document.createElement('span');
    let text = document.createElement('p');
    let selectBtn = document.createElement('IMG');

    selectBtn.src = isChecked ? './square-check-solid.svg' : './square-regular.svg';
    selectBtn.classList.add(isChecked ? 'select-btn-on' : 'select-btn-off');
    newTask.append(selectBtn);


    newTask.classList.add('task-item');
    text.classList.add('para');
    text.innerHTML = taskList;
    newTask.append(text);


    let edit = document.createElement('IMG');
    edit.src = './pen-to-square-regular.svg';
    let deleteBtn = document.createElement('IMG');
    deleteBtn.src = './trash-can-regular.svg';
    options.id = 'modify-ctrl';
    options.append(edit, deleteBtn);
    newTask.append(options);

    selectOption(selectBtn)
    deleteList(deleteBtn, newTask, selectBtn);
    editList(edit, selectBtn, text);

    return newTask;
}


function selectOption(selection) {
    selection.onclick = function () {
        if (selection.classList.contains('select-btn-off')) {
            selection.classList.remove('select-btn-off');
            selection.classList.add('select-btn-on');
            selection.src = './square-check-solid.svg';
            saveTasks();
        }
        else {
            selection.src = './square-regular.svg';
            selection.classList.add('select-btn-off');
            selection.classList.remove('select-btn-on');
            saveTasks();
        }
    }
}


function deleteList(button, target, checked) {
    button.onclick = function () {
        if (!checked.classList.contains('select-btn-off')) {
            taskContainer.removeChild(target);
            saveTasks();
        }
    }
}


function editList(editOption, checked, content) {
    editOption.onclick = () => {
        if (checked.classList.contains('select-btn-on')) {
            editOption.src = './check-solid.svg';
            content.contentEditable = 'true';
        }

        else if (checked.classList.contains('select-btn-off')) {
            content.contentEditable = 'false';
            editOption.src = './pen-to-square-regular.svg';
        }

        saveTasks();
    }

}


function saveTasks() {
    let tasks = Array.from(document.querySelectorAll('.task-item')).map(task => {
        return {
            text: task.querySelector('.para').innerHTML,
            checked: task.querySelector('IMG').classList.contains('select-btn-on')
        };
    });

    localStorage.setItem('taskData', JSON.stringify(tasks));
}


function loadData() {
    let tasks = JSON.parse(localStorage.getItem('taskData')) || [];
    tasks.forEach(items => {
        let newTask = createTaskElement(items.text, items.checked);
        taskContainer.append(newTask);
    });
}