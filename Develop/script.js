var currentDayEl = $('#currentDay');
var taskDisplayEl = $('.time-block');

$(function () {
  // Function to save the task to local storage once user has clicked on the save button
  function saveTask () { 
    var newTask = {
      hour: $(this).parent().attr('id'),
      task: $(this).siblings('.description').val()
    }
    var tasks = getTask();
    tasks.push(newTask);
    setTask(tasks);
  }

  // Checks the current time and applies a class to the time blocks depending on its relation to the current time
  function checkCurrentTime() {
    var time = dayjs().format('H');
    // var time = 15; // for testing purposes
    taskDisplayEl.each(function () { 
      if (time > $(this).data('hour')) {
        $(this).addClass('past')
      } else if (time == $(this).data('hour')) {
        $(this).addClass('present')
      } else {
        $(this).addClass('future')
      }
    });
  }

  // Gets the current local storage to the task
  function getTask() {
    var tasks = localStorage.getItem('tasks');
    if(tasks) {
      tasks = JSON.parse(tasks);
    } else {
      tasks = [];
    }
    return tasks;
  }

  // Sets the new task to the local storage
  function setTask(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Renders the task in the storage to the webpage
  function renderTask() { 
    taskDisplayEl.children('.description').empty();
    var tasks = getTask();
    for(var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      var currentHour = $('#' + task.hour)
      currentHour.children('.description').text(task.task);
    }
  }

  // Displays the current day and time to the webpage
  function displayTime() {
    var time = dayjs().format('MMM DD, YYYY [,] hh:mm:ss A');
    currentDayEl.text(time);
  }

  // Keeps updating the current time to the webpage
  displayTime();
  setInterval(displayTime, 1000);

  // Renders task to the page and applies the correct classes
  renderTask();
  checkCurrentTime();
  // Event listener for all save buttons
  taskDisplayEl.on('click','.saveBtn', saveTask);
  
});


