$(document).ready(function () {

    var getAndDisplayAllTasks = function () {
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=121',
            dataType: 'json',
            success: function (response, textStatus) {
                $('#completed').empty();
                $('#active').empty(); // Add this line
                response.tasks.forEach(function (task) {
                    var id = task.id;
                    var content = task.content;
                    var completed = task.completed;

                    if (completed) {
                        $('#completed').append('<div id="' + id + '"> <input type="checkbox" style="width:24px; height=24px" class="task-completed" checked>' + '<h4 class="task-content">' + content + '</h4> <button class="delete"><i style="font-size:16px" class="fa">&#xf014;</i></button> </div>');
                    } else {
                        $('#active').append('<div id="' + id + '"> <input type="checkbox" style="width:24px; height=24px" class="task-completed" >' + '<h4 class="task-content">' + content + '</h4>  <button class="delete"><i style="font-size:16px" class="fa">&#xf014;</i></button> </div>');
                    }

                })
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    var createTask = function () {
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=121',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function (response, textStatus) {
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    var deleteTask = function (id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=121',
            success: function (response, textStatus) {
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    var markTaskComplete = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=121',
            dataType: 'json',
            success: function (response, textStatus) {
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }
    var markTaskActive = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=121',
            dataType: 'json',
            success: function (response, textStatus) {
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
    });

    $(document).on('click', '.delete', function () {
        var id = $(this).parent().attr('id');
        deleteTask(id);
    });

    $(document).on('change', '.task-completed', function () {
        var id = $(this).parent().attr('id');
        if ($(this).checked) {
            markTaskComplete(id);
        } else {
            markTaskActive(id);
        }
    });

    getAndDisplayAllTasks();

});