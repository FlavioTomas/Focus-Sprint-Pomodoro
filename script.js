//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------   Variables Section   -------------------------------------------------------------------------------//


// Getting buttons
const focusButton = document.querySelector('.js-focus-button')
const breakButton = document.querySelector('.js-break-button')
const longBreakButton = document.querySelector('.js-long-break-button')
const timerModesButtons = document.querySelectorAll('.button--time-mode')
const mainContainer = document.querySelector('.main-container')
const timerDisplay = document.querySelector('.js-timer-display')
const darkModeToggle = document.querySelector('.js-dark-mode-toggle')
const playPauseButton = document.querySelector('.js-play-pause-button');
const resetButton = document.querySelector('.js-reset-button');
const skipButton = document.querySelector('.js-skip-button')
const settingsButton = document.querySelector('.js-settings-button')
const settingsForm = document.querySelector('.js-settings')
const usersFocusTime = document.querySelector('.js-settings__numbers-input--focus')
const usersBreakTime = document.querySelector('.js-settings__numbers-input--break')
const usersLongBreakTime = document.querySelector('.js-settings__numbers-input--long-break')
const usersLongBreakInterval = document.querySelector('.js-settings__options--long-break-interval')
const showLongBreakInterval = document.querySelector('.js-settings__options--long-break-interval--text')
const breaksAutoStartInput = document.querySelector('.js-settings__options--breaks-auto-starts-input')
const focusAutoStartInput = document.querySelector('.js-settings__options--focus-auto-start-input')
const soundNotificationInput = document.querySelector('.js-settings__notifications--sound-switch-input')
const soundNotification = document.getElementById('sound-notification')
const popUpInput = document.querySelector('.js-settings__notifications--pop-up-switch-input')
const tasksSettingsButton = document.querySelector('.js-task-options-button')
const tasksSettingsForm = document.querySelector('.js-task-settings')

// --- Task Creation Variables ---
const addTaskButton = document.querySelector('.js-add-task-button')
const tasksContainer = document.querySelector('.tasks__display')
const taskCreationForm = document.querySelector('.js-tasks__display-create')
const taskInput = document.querySelector('.js-tasks__display-create--input')
const saveTaskButton = document.querySelector('.js-tasks__display-create--buttons--save')
const cancelTaskButton = document.querySelector('.js-tasks__display-create--buttons--cancel')

// --- New Task Settings Variables ---
const deleteAllTasksButton = document.querySelector('.js-tasks-settings__options--delete-all-tasks-button');
const deleteCompletedTasksButton = document.querySelector('.js-tasks-settings__options--delete-completed-tasks-button');
const toggleCompletedTasksButton = document.querySelector('.js-tasks-settings__options--toggle-completed-tasks-button');
let areCompletedTasksHidden = false; // State variable for hiding/showing tasks

// Getting CSS styles
const rootElement = document.documentElement;
const styles = getComputedStyle(rootElement);
const colorSurface = styles.getPropertyValue('--color-surface')
const colorBackground = styles.getPropertyValue('--color-background')
// setting timerInterval variable so skipButton won't bug
let timerInterval = null


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------   Themes Section   ----------------------------------------------------------------------------------//


// Changing the background color and the timer display value according to the mode
function changeBackgroundColor(newColor) {
    rootElement.style.setProperty('--color-background', newColor);
}

// Function with the theme colors of focus mode both in light and dark mode
const focusButtonTheme = () => {
    if (mainContainer.classList.contains('dark-mode')) {
        changeBackgroundColor("#1E2A3A")
        rootElement.style.setProperty('--color-accent', '#00C896');
        rootElement.style.setProperty('--color-accent-hover', '#68dbbe');
        rootElement.style.setProperty('--color-surface', '#162033');
    } else {
        changeBackgroundColor("#e7ffebff");
        rootElement.style.setProperty('--color-accent', '#1E2A3A');
        rootElement.style.setProperty('--color-accent-hover', '#374e6bff');
        rootElement.style.setProperty('--color-surface', '#afaeaeff');
    }
    updateTimerDisplay(timers.focus)
    clearInterval(timerInterval)
    focusButton.classList.add('active')
    updatePlayButton(true)
}

// Function with the theme colors of break mode both in light and dark mode
const breakButtonTheme = () => {
    if (mainContainer.classList.contains('dark-mode')) {
        changeBackgroundColor("#0f2e24ff")
        rootElement.style.setProperty('--color-accent', '#52d864ff');
        rootElement.style.setProperty('--color-accent-hover', '#61ff76ff');
        rootElement.style.setProperty('--color-surface', '#062018ff');
    } else {
        changeBackgroundColor("#4fe9b5ff")
        rootElement.style.setProperty('--color-accent', '#002712ff');
        rootElement.style.setProperty('--color-accent-hover', '#004721ff');
        rootElement.style.setProperty('--color-surface', '#3ea381ff');
    }
    updateTimerDisplay(timers.break)
    clearInterval(timerInterval)
    breakButton.classList.add('active')
    updatePlayButton(true)
}

// Function with the theme colors of longBreak mode both in light and dark mode
const longBreakButtonTheme = () => {
    if (mainContainer.classList.contains('dark-mode')) {
        changeBackgroundColor("#461935")
        rootElement.style.setProperty('--color-accent', '#b82f83ff');
        rootElement.style.setProperty('--color-accent-hover', '#f53fafff');
        rootElement.style.setProperty('--color-surface', '#2c0c20ff');
    } else {
        changeBackgroundColor("rgb(238, 159, 248)")
        rootElement.style.setProperty('--color-accent', '#240129ff');
        rootElement.style.setProperty('--color-accent-hover', '#480052ff');
        rootElement.style.setProperty('--color-surface', '#a053aaff');
    }
    updateTimerDisplay(timers.longBreak)
    clearInterval(timerInterval)
    longBreakButton.classList.add('active')
    updatePlayButton(true)
}

// Function with the theme colors of the text both in light and dark mode
const darkModeTheme = () => {
    if (mainContainer.classList.contains('dark-mode')) {
        changeBackgroundColor("#e7ffebff");
        rootElement.style.setProperty('--color-text-primary', '#1f1f1fff');
        rootElement.style.setProperty('--color-accent', '#1E2A3A');
        rootElement.style.setProperty('--color-accent-hover', '#374e6bff');
        rootElement.style.setProperty('--color-surface', '#afaeaeff');
        rootElement.style.setProperty('--color-muted', '#000000ff');
        mainContainer.classList.remove('dark-mode')
    } else {
        changeBackgroundColor("#1E2A3A")
        rootElement.style.setProperty('--color-text-primary', '#F0F0F0');
        rootElement.style.setProperty('--color-accent', '#00C896');
        rootElement.style.setProperty('--color-accent-hover', '#68dbbe');
        rootElement.style.setProperty('--color-surface', '#162033');
        rootElement.style.setProperty('--color-muted', '#A0AEC0');
        mainContainer.classList.add('dark-mode')
    }
    timerModesButtons.forEach(btn => { btn.classList.remove('active') })
    focusButton.classList.toggle('active')
    updateTimerDisplay(timers.focus)
}

//------- Events of theme section -------//

focusButton.addEventListener('click', focusButtonTheme)
breakButton.addEventListener('click', breakButtonTheme)
longBreakButton.addEventListener('click', longBreakButtonTheme)
// Changing between dark and light mode
darkModeToggle.addEventListener('click', darkModeTheme)


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------   Timers Section   ----------------------------------------------------------------------------------//


// --- Variables to control the timers ---
let currentMode = 'focus'; // Saves the active mode ('focus', 'break', 'longBreak')
let endTime = 0;           // Saves the exact timestamp of when should end

// All the timers in an object to easy use
const timers = {
    focus: 25 * 60,
    break: 5 * 60,
    longBreak: 15 * 60
};

let remainingTimes = { ...timers };

// The initial time values
let focusTime = timers.focus;
let breakTime = timers.break;
let longBreakTime = timers.longBreak;
let longBreakInterval = 6;

// Function to make the timer precise
function tick() {
    // Calculates the actual remaining time in seconds
    const timeLeft = Math.round((endTime - Date.now()) / 1000);
    // if the time runs out, clear the interval and skip to the next mode.
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        playSoundNotification(soundNotificationOptions);
        showPopUp(popUpOptions)
        skipMode(breaksAutoStart, focusAutoStart);
        return;
    }
    updateTimerDisplay(timeLeft);
}

// Function to make the timer run
function startTimer() {
    const duration = remainingTimes[currentMode];
    if (duration <= 0) return;
    // Calculates the final timestamp.
    endTime = Date.now() + duration * 1000;
    // Starts the setInterval to run the 'tick' function every second.
    timerInterval = setInterval(tick, 1000);
    playPauseButton.classList.add('playing');
    updatePlayButton(false);
}

// Function to stop the timer
function pauseTimer() {
    clearInterval(timerInterval);
    // Saves exactly how much time was left when you paused.
    const timeLeft = Math.round((endTime - Date.now()) / 1000);
    remainingTimes[currentMode] = timeLeft > 0 ? timeLeft : 0;
    playPauseButton.classList.remove('playing');
    updatePlayButton(true);
}

// --- Interface Functions ---

// Function to update the stopwatch in the screen
const updateTimerDisplay = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Focus Sprint`;
};

// Function to alternate between the play and pause
const updatePlayButton = (isPaused) => {
    playPauseButton.textContent = isPaused ? 'PLAY' : 'PAUSE';
    playPauseButton.classList.toggle('button--playing', !isPaused);
};

// Function to reset the timer
const resetTimer = () => {
    clearInterval(timerInterval);
    remainingTimes[currentMode] = timers[currentMode]; // Reset the remaining time.
    updateTimerDisplay(remainingTimes[currentMode]);
    playPauseButton.classList.remove('playing');
    updatePlayButton(true);
};

// Function to skip to the next mode
const skipMode = (breakAutoStart, focusAutoStart) => {
    clearInterval(timerInterval);
    playPauseButton.classList.remove('playing');
    updatePlayButton(true);
    const currentActiveButton = document.querySelector('.button--time-mode.active');
    let currentIndex = Array.from(timerModesButtons).indexOf(currentActiveButton);
    timerModesButtons.forEach(btn => btn.classList.remove('active'));
    let nextIndex = (currentIndex + 1) % timerModesButtons.length;
    // Logic for the Long Break Interval
    if (longBreakInterval == 0) {
        nextIndex = 2;
        longBreakInterval = usersLongBreakInterval.value == '' ? 7 : (usersLongBreakInterval.value * 2) + 1;
    } else {
        longBreakInterval--
        if (nextIndex == 2) {
            nextIndex = 0
        }
    }

    const nextButton = timerModesButtons[nextIndex];
    currentMode = nextButton.dataset.mode; // Updates the current mode
    // Calls the corresponding theme function
    if (currentMode === 'focus') focusButtonTheme();
    if (currentMode === 'break') breakButtonTheme();
    if (currentMode === 'longBreak') longBreakButtonTheme();
    // If autoStart is enabled, it starts the next timer
    if (breakAutoStart == 'on' && (currentMode == 'break' || currentMode === 'longBreak')) {
        startTimer();
    }
    if (focusAutoStart == 'on' && currentMode == 'focus') {
        startTimer();
    }
};



// --- Timer Section Events ---



playPauseButton.addEventListener('click', () => {
    if (playPauseButton.classList.contains('playing')) {
        pauseTimer();
    } else {
        startTimer();
    }
});
resetButton.addEventListener('click', resetTimer);
skipButton.addEventListener('click', () => skipMode(breaksAutoStart, focusAutoStart));
timerModesButtons.forEach(button => {
    button.addEventListener('click', () => {
        // If a timer is running, save the progress before switching.
        if (playPauseButton.classList.contains('playing')) {
            const timeLeft = Math.round((endTime - Date.now()) / 1000);
            remainingTimes[currentMode] = timeLeft > 0 ? timeLeft : 0;
        }
        clearInterval(timerInterval);
        timerModesButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentMode = button.dataset.mode;
        updateTimerDisplay(remainingTimes[currentMode]);
        playPauseButton.classList.remove('playing');
        updatePlayButton(true);
    });
});




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------   Settings Section   ----------------------------------------------------------------------------------//




let breaksAutoStart = 'off'
let focusAutoStart = 'off'
let soundNotificationOptions = 'off'
let popUpOptions = 'off'


// Function to show the settings in the screen
const showSettingsForm = () => {
    settingsForm.classList.toggle('showing-settings');
    if (!playPauseButton.classList.contains('playing')) {
        timerModesButtons.forEach(button => {
            if (button.classList.contains('active')) {
                button.dataset.mode == 'focus' ? updateTimerDisplay(remainingTimes.focus) : button.dataset.mode == 'break' ? updateTimerDisplay(remainingTimes.break) : updateTimerDisplay(remainingTimes.longBreak)
            }
        })
    }
}


// Function to change the duration of the focus timer by the user settings
const changeFocusTime = () => {
    const newTime = usersFocusTime.value || 25;
    timers.focus = newTime * 60;
    remainingTimes.focus = newTime * 60
    if (currentMode === 'focus') {
        updateTimerDisplay(timers.focus);
    }
}


// Function to change the duration of the break timer by the user settings
const changeBreakTime = () => {
    const newTime = usersBreakTime.value || 5;
    timers.break = newTime * 60;
    remainingTimes.break = newTime * 60;
    if (currentMode === 'break') {
        updateTimerDisplay(timers.break);
    }
}


// Function to change the duration of the long break timer by the user settings
const changeLongBreakTime = () => {
    const newTime = usersLongBreakTime.value || 15;
    timers.longBreak = newTime * 60;
    remainingTimes.longBreak = newTime * 60;
    if (currentMode === 'longBreak') {
        updateTimerDisplay(timers.longBreak);
    }
}


// Function to change the interval that the long break will be used timer by the user settings
const changeLongBreakInterval = () => {
    longBreakInterval = usersLongBreakInterval.value * 2
    showLongBreakInterval.innerHTML = String(usersLongBreakInterval.value)
}


// Function to change if the breaks timers will start automatically by the user settings
const changeBreaksAutoStart = () => {
    breaksAutoStart = breaksAutoStart == 'on' ? 'off' : 'on'
}


// Function to change if the focus timer will start automatically by the user settings
const changeFocusAutoStart = () => {
    focusAutoStart = focusAutoStart == 'on' ? 'off' : 'on'
}


// Function to play the sound notification
const playSoundNotification = verification => {
    if (verification == 'on') {
        soundNotification.currentTime = 0;
        soundNotification.play();
    }
}


// Function to change if the sound notification is on or off by the user settings
const changeSoundNotificationOptions = () => {
    soundNotificationOptions = soundNotificationOptions == 'on' ? 'off' : 'on'
}


// Function to show the notification pop up
const showPopUp = verification => {
    if (verification == 'on') {
        alert('Time Finished')
    }
}


// Function to change if the notification pop up is on or off by the user settings
const changePopUpOptions = () => {
    popUpOptions = popUpOptions == 'on' ? 'off' : 'on'
}



// ---  Settings section event listeners --- //



settingsButton.addEventListener('click', showSettingsForm)
usersFocusTime.addEventListener('change', changeFocusTime)
usersBreakTime.addEventListener('change', changeBreakTime)
usersLongBreakTime.addEventListener('change', changeLongBreakTime)
mainContainer.addEventListener('click', (event) => {
    if (!settingsButton.contains(event.target) && !settingsForm.contains(event.target) && settingsForm.classList.contains('showing-settings') && !darkModeToggle.contains(event.target)) {
        showSettingsForm()
    }
})
usersLongBreakInterval.addEventListener('change', changeLongBreakInterval)
breaksAutoStartInput.addEventListener('change', changeBreaksAutoStart)
focusAutoStartInput.addEventListener('change', changeFocusAutoStart)
soundNotificationInput.addEventListener('change', changeSoundNotificationOptions)
popUpInput.addEventListener('change', changePopUpOptions)




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------  Tasks Settings Section   ----------------------------------------------------------------- -----------//




// Function to show the task settings in the screen
const showTasksSettings = () => {
    tasksSettingsForm.classList.toggle('showing-settings')
}


// Deletes all tasks regardless of their status
const deleteAllTasks = () => {
    const allTasks = document.querySelectorAll('.task-item');
    if (allTasks.length > 0 && window.confirm("Are you sure you want to delete ALL tasks? This cannot be undone.")) {
        allTasks.forEach(task => task.remove());
    }
    showTasksSettings(); // Close menu after action
};


// Deletes only the tasks that are marked as completed
const deleteCompletedTasks = () => {
    const completedTasks = document.querySelectorAll('.task-item--completed');
    if (completedTasks.length > 0 && window.confirm("Are you sure you want to delete all COMPLETED tasks?")) {
        completedTasks.forEach(task => task.remove());
    }
    showTasksSettings(); // Close menu after action
};


// Applies the current visibility state to all completed tasks
const updateCompletedTasksVisibility = () => {
    const completedTasks = document.querySelectorAll('.task-item--completed');
    completedTasks.forEach(task => {
        if (areCompletedTasksHidden) {
            task.classList.add('hidden');
        } else {
            task.classList.remove('hidden');
        }
    });
};


// Toggles the visibility state and updates the button text
const toggleCompletedTasksVisibility = () => {
    // Toggle the state variable
    areCompletedTasksHidden = !areCompletedTasksHidden;

    // Update the button text and icon to reflect the new state
    const buttonText = toggleCompletedTasksButton.querySelector('p');
    const buttonIcon = toggleCompletedTasksButton.querySelector('.material-symbols-outlined');

    if (areCompletedTasksHidden) {
        buttonText.textContent = 'Show Completed Tasks';
        buttonIcon.textContent = 'visibility';
    } else {
        buttonText.textContent = 'Hide Completed Tasks';
        buttonIcon.textContent = 'disabled_visible';
    }

    // Apply the new visibility to the tasks on the page
    updateCompletedTasksVisibility();
    showTasksSettings(); // Close menu after action
};



// --- Add Event Listeners for tasks settings --- //



deleteAllTasksButton.addEventListener('click', deleteAllTasks);
deleteCompletedTasksButton.addEventListener('click', deleteCompletedTasks);
toggleCompletedTasksButton.addEventListener('click', toggleCompletedTasksVisibility);
tasksSettingsButton.addEventListener('click', showTasksSettings)
mainContainer.addEventListener('click', (event) => {
    if (!tasksSettingsButton.contains(event.target) && !tasksSettingsForm.contains(event.target) && tasksSettingsForm.classList.contains('showing-settings') && !darkModeToggle.contains(event.target)) {
        showTasksSettings()
    }
})




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------  Tasks Creation & Display Section   ----------------------------------------------------------------------------//




// --- CREATE TASK ---
const showTaskCreator = () => {
    addTaskButton.style.display = 'none';
    taskCreationForm.classList.add('showing-settings');
    taskInput.focus();
}

const hideTaskCreator = () => {
    taskCreationForm.classList.remove('showing-settings');
    addTaskButton.style.display = 'inline-flex';
    taskInput.value = '';
}

const createTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert("Please enter a task name.");
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    // We add the edit container here but keep it hidden with CSS
    taskItem.innerHTML = `
        <input type="checkbox" class="task-item__checkbox">
        <p class="task-item__text">${taskText}</p>
        
        <!-- Container for editing -->
        <div class="task-item__edit-container">
            <input type="text" class="task-item__edit-input" value="${taskText}">
            <button class="task-item__edit-button" data-action="save-edit" aria-label="Save changes">
                <span class="material-symbols-outlined">check</span>
            </button>
            <button class="task-item__edit-button" data-action="cancel-edit" aria-label="Cancel changes">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>

        <button class="button button-icon task-item__options" aria-label="Task options">
            <span class="material-symbols-outlined">more_vert</span>
        </button>
    `;

    tasksContainer.insertBefore(taskItem, addTaskButton);
    hideTaskCreator();
}

// --- EDIT TASK ---
const enterEditMode = (taskItem) => {
    // First, exit edit mode for any other task that might be in it
    const currentlyEditing = document.querySelector('.task-item--editing');
    if (currentlyEditing) {
        exitEditMode(currentlyEditing);
    }
    taskItem.classList.add('task-item--editing');
    const input = taskItem.querySelector('.task-item__edit-input');
    input.focus();
    input.select(); // Select the text for easy replacement
}

const exitEditMode = (taskItem) => {
    taskItem.classList.remove('task-item--editing');
}

// --- TASK EVENT LISTENERS ---

addTaskButton.addEventListener('click', showTaskCreator);
cancelTaskButton.addEventListener('click', hideTaskCreator);
saveTaskButton.addEventListener('click', createTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') createTask();
});

// Event listener for completing a task (checking the box)
tasksContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-item__checkbox')) {
        const taskItem = event.target.closest('.task-item');
        taskItem.classList.toggle('task-item--completed');
        // If completed tasks are hidden, update visibility immediately
        updateCompletedTasksVisibility();
    }
});

// Main event listener for all task actions (Edit, Delete, Save, Cancel, Open Menu)
tasksContainer.addEventListener('click', (event) => {
    const actionElement = event.target.closest('[data-action]');
    const optionsButton = event.target.closest('.task-item__options');
    const taskItem = event.target.closest('.task-item');

    // If an action button (Save, Cancel, Edit, Delete) was clicked
    if (actionElement) {
        const action = actionElement.dataset.action;

        if (action === 'edit') {
            enterEditMode(taskItem);
            closeAllMenus();
        }

        if (action === 'delete') {
            if (window.confirm("Are you sure you want to delete this task?")) {
                taskItem.remove();
            }
        }

        if (action === 'save-edit') {
            const input = taskItem.querySelector('.task-item__edit-input');
            const newText = input.value.trim();
            if (newText) {
                taskItem.querySelector('.task-item__text').textContent = newText;
            }
            exitEditMode(taskItem);
        }

        if (action === 'cancel-edit') {
            const originalText = taskItem.querySelector('.task-item__text').textContent;
            taskItem.querySelector('.task-item__edit-input').value = originalText;
            exitEditMode(taskItem);
        }
    }

    // If the three-dots button was clicked to open/close the menu
    else if (optionsButton) {
        toggleMenu(optionsButton.parentElement);
    }
});

// --- MENU FUNCTIONS ---

const closeAllMenus = () => {
    document.querySelectorAll('.task-item__menu').forEach(menu => menu.remove());
}

const toggleMenu = (taskItem) => {
    const existingMenu = taskItem.querySelector('.task-item__menu');

    closeAllMenus(); // Close all other menus first

    if (!existingMenu) { // If no menu exists for this item, create and show it
        const menu = document.createElement('div');
        menu.className = 'task-item__menu active';
        menu.innerHTML = `
            <div class="task-item__menu-option" data-action="edit">
                <span class="material-symbols-outlined">edit</span> Edit
            </div>
            <div class="task-item__menu-option" data-action="delete">
                <span class="material-symbols-outlined">delete</span> Delete
            </div>
        `;
        taskItem.appendChild(menu);
    }
    // If a menu was already there, the closeAllMenus() call above will have removed it, effectively toggling it off.
}

// Global click listener to close the menu if clicking outside of it
document.addEventListener('click', (event) => {
    // If the click is outside a task item, close all menus
    if (!event.target.closest('.task-item')) {
        closeAllMenus();
    }
});

