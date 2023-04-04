// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDayEl = $('#currentDay');
var taskDisplayEl = $('.time-block');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function saveTask () { 
    console.log($(this).siblings('.description').val());
    var newTask = {
      hour: $(this).parent().attr('id'),
      task: $(this).siblings('.description').val()
    }
    var tasks = getTask();
    tasks.push(newTask);
    setTask(tasks);
  }
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
    function getTask() {
      var tasks = localStorage.getItem('tasks');
      if(tasks) {
        tasks = JSON.parse(tasks);
      } else {
        tasks = [];
      }
      return tasks;
    }

    function setTask(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask() { 
      taskDisplayEl.children('.description').empty();
      var tasks = getTask();
      for(var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var currentHour = $('#' + task.hour)
        currentHour.children('.description').text(task.task);
      }
    }

  // TODO: Add code to display the current date in the header of the page.
  function displayTime() {
    var time = dayjs().format('MMM DD, YYYY [,] hh:mm:ss A');
    currentDayEl.text(time);
  }

  displayTime();
  setInterval(displayTime, 1000);
  renderTask();
  taskDisplayEl.on('click','.saveBtn', saveTask);
  checkCurrentTime();
});


