const markTodoAsCompleted = (id) => {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8000/todos/${id}/completed`,
        success: function(todos) {
            console.log(todos);
            setTodos(todos);
        },
    });
}

const createTodo = () => {
    const newTodoText = $('#new-todo-input').prop('value');
    $.ajax({
        type: 'POST',
        url: `http://localhost:8000/todos`,
        data: JSON.stringify({ text: newTodoText }),
        contentType: 'application/json',
        success: function(todos) {
            setTodos(todos);
        },
    });
}

const deleteTodo = (id) => {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8000/todos/${id}`,
        success: function(todos) {
            setTodos(todos);
        },
    });
}

const addTodo = (todo) => {
    console.log("Adding todo");
    console.log(todo);
    $('#todos-list').append(`
        <div class="todo">
            <h3>${todo.text}</h3>
            ${todo.isCompleted
                ? '<p>Complete!</p>'
                : ''}
            ${todo.isCompleted
                ? `<button onclick="deleteTodo('${todo.id}')">Delete</button>`
                : `<button onclick="markTodoAsCompleted('${todo.id}')">Mark As Completed</button>`}
        </div>
    `);
};

const setTodos = (todos) => {
    $('#todos-list').empty();
    todos.forEach(todo => addTodo(todo));
}

$(() => {
    $.ajax({
        url: 'http://localhost:8000/todos',
        success: function(todos) {
            setTodos(todos);
        },
    });
});