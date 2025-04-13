loadTasks();
loadTheme();

function newTask() {
    const input = document.getElementById('myInput');
    const taskText = input.value.trim();

    if (taskText === '') return;

    const li = document.createElement('li');
    
    const label = document.createElement('div');
    label.className = 'task-label';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-text';

    checkbox.addEventListener('change', () => {
        span.classList.add('completed-task');
        li.style.display = 'none';
        saveTasks();
    });

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    label.appendChild(deleteButton);

    const ul = document.getElementById('taskList');
    ul.appendChild(li);

    input.value = '';
    saveTasks();
}

let completedTasksVisible = false;

function showCompleted() {
    const completedTasks = document.querySelectorAll('li:has(.completed-task)');
    const showButton = document.getElementById('showButton');
    
    if (!completedTasksVisible) {
        // Show completed tasks
        completedTasks.forEach(task => {
            task.style.display = 'flex';
        });
        showButton.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
        completedTasksVisible = true;
    } else {
        // Hide completed tasks
        completedTasks.forEach(task => {
            task.style.display = 'none';
        });
        showButton.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
        completedTasksVisible = false;
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
    }

    const themeButton = document.getElementById('themeButton');
    if (body.classList.contains('dark')) {
        themeButton.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
        themeButton.style.backgroundColor = "var(--primary-color)";
        themeButton.style.color = "var(--secondary-color)";
    } else {
        themeButton.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
        themeButton.style.backgroundColor = "var(--primary-color)";
        themeButton.style.color = "var(--secondary-color)";
    }

    saveTheme();
}

function clearList() {
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const completedTasks = [];
    const listItems = document.querySelectorAll('#taskList li');

    listItems.forEach(item => {
        const textElement = item.querySelector('.task-text');
        const isCompleted = textElement.classList.contains('completed-task');
        
        if (textElement) {
            const taskText = textElement.textContent;
            if (isCompleted) {
                completedTasks.push(taskText);
            } else {
                tasks.push(taskText);
            }
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    // Load active tasks
    tasks.forEach(taskText => {
        if (taskText) {
            const input = document.getElementById('myInput');
            input.value = taskText;
            newTask();
        }
    });

    // Load completed tasks
    completedTasks.forEach(taskText => {
        if (taskText) {
            const input = document.getElementById('myInput');
            input.value = taskText;
            
            // Create the task
            const li = document.createElement('li');
            
            const label = document.createElement('div');
            label.className = 'task-label';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = true;

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'x';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                li.remove();
                saveTasks();
            });
            
            const span = document.createElement('span');
            span.textContent = taskText;
            span.className = 'task-text';

            checkbox.addEventListener('change', () => {
                li.classList.add('completed-task');
                li.style.display = 'none';
                saveTasks();
            });

            label.appendChild(checkbox);
            label.appendChild(span);
            li.appendChild(label);
            label.appendChild(deleteButton);

            // Mark as completed and hide
            span.classList.add('completed-task');
            li.style.display = 'none';

            const ul = document.getElementById('taskList');
            ul.appendChild(li);
            
            input.value = '';
        }
    });
}

function saveTheme() {
    const isDarkTheme = document.body.classList.contains('dark');
    localStorage.setItem('darkTheme', isDarkTheme);
}

function loadTheme() {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    const body = document.body;
    const themeButton = document.getElementById('themeButton');
    
    if (isDarkTheme) {
        body.classList.remove('light');
        body.classList.add('dark');
        themeButton.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        themeButton.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
    }
    
    themeButton.style.backgroundColor = "var(--primary-color)";
    themeButton.style.color = "var(--secondary-color)";
}

document.getElementById('myInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        newTask();
    }
});