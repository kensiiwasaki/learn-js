const todoList = []
let inputForm, todoMain, tabButton, sortMenu
let displayTarget = "inbox"
let sortIndex = "created-desc"

// ToDoの一個単位のHTML文字列を生成
function createTodoHtmlString(todo) {
    let htmlString = ""
    const editType = todo.isEdit ? "editFixed" : "edit"
    const editButtonLabel = todo.isEdit ? "編集完了" : "編集"
    const doneType = todo.isDone ? "inbox" : "done"
    const doneButtonLabel = todo.isDone ? "未完了" : "完了"
    let todoTextCell, priorityCell
    if (todo.isEdit) {
      todoTextCell =
        '<td class="cell-text"><input class="input-edit" type="text" value=' +
        todo.text +
        " /></td>"
      priorityCell =
        '<td class="cell-priority"><input class="input-priority" type="number" value=' +
        todo.priority +
        " /></td>"
    } else {
      todoTextCell = '<td class="cell-text">' + todo.text + "</td>"
      priorityCell = '<td class="cell-priority">' + todo.priority + "</td>"
    }
    htmlString += '<tr id="' + todo.id + '">'
    htmlString +=
      '<td class="cell-edit-button"><button data-type="' +
      editType +
      '">' +
      editButtonLabel +
      "</button></td>"
    htmlString += todoTextCell
    htmlString += '<td class="cell-created-at">' + todo.createdAt + "</td>"
    htmlString += priorityCell
    htmlString += '<td class="cell-done">'
    htmlString += '<button data-type="' + doneType + '">'
    htmlString += doneButtonLabel
    htmlString += "</button></td>"
    htmlString += "</td>"
    htmlString += '<td class="cell-delete">'
    htmlString += '<button data-type="delete">'
    htmlString += '削除'
    htmlString += "</button></td>"
    htmlString += "</tr>"
    return htmlString
  }

// 完了ステートの変更
function updateTodoState(todo, type) {
    todo.isDone = type === "done"
    updateTodoList()
}

// ソートするための関数
function sortTodos(a, b) {
    switch (sortIndex) {
        case "created-desc":
            return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        case "created-asc":
            return Date.parse(a.createdAt) - Date.parse(b.createdAt)
        case "priority-desc":
            return b.priority - a.priority
        case "priority-asc":
            return a.priority - b.priority
        default:
            return todoList
    }
}

// 編集するための関数
function editTodo(todo, type) {
    todo.isEdit = type === "edit"
    updateTodoList()
}

// 削除するための関数
function deleteTodo(todo) {

    const index = todoList.findIndex((t) => t.id === todo.id)

    todoList.splice(index, 1)
}


function updateTodoList() {
    let htmlStrings = ""

    todoList
        .filter(todo => todo.isDone !== (displayTarget === "inbox"))
        .sort(sortTodos)
        .forEach(todo => {

            htmlStrings += createTodoHtmlString(todo)
            todoMain.innerHTML = htmlStrings
        })
        todoMain.innerHTML = htmlStrings

        todoList
            .filter(todo => todo.isDone !== (displayTarget === "inbox"))
            .forEach(todo => {
                const todoEl = document.getElementById(todo.id)
                if (todoEl) {
                    todoEl.querySelectorAll("button").forEach(btn => {
                        const type = btn.dataset.type
                        btn.addEventListener("click", event => {
                            if (type.indexOf("edit") >= 0) {
                                editTodo(todo, type)
                            } else if (type.indexOf("delete") >= 0) {
                                deleteTodo(todo)
                                updateTodoState(todo, type)
                            } else {
                                updateTodoState(todo, type)
                            }
                        })
                    })

                    if (todo.isEdit) {
                        todoEl.querySelector(".input-edit").addEventListener("input", event => {
                            todo.text = event.currentTarget.value
                        })
                        todoEl
                            .querySelector(".input-priority")
                            .addEventListener("input", event => {
                                todo.priority = parseInt(event.currentTarget.value, 10)
                            })
                    }
                }
            })
}


function clearInputForm() {
    inputForm["input-text"].value = ""
}


function addTodo(todoObj) {
    todoObj.id = "todo-" + (todoList.length + 1)
    todoObj.createdAt = new Date().toLocaleString()
    todoObj.priority = 3
    todoObj.isDone = false
    todoObj.isEdit = false
    todoList.unshift(todoObj)
    updateTodoList()
    clearInputForm()
}


function handleSubmit(event) {
    event.preventDefault()
    const todoObj = {
        text: inputForm["input-text"].value
    }
    addTodo(todoObj)
}


function handleTabClick(event) {
    const me = event.currentTarget
    displayTarget = me.dataset.target
    updateTodoList()
}


function handleSort(e) {
    sortIndex = e.currentTarget.value
    updateTodoList()
}


function registerDOM() {
    inputForm = document.querySelector("#input-form")
    todoMain = document.querySelector("#todo-main")
    tabButton = document.querySelector("#tab").querySelectorAll("button")
    sortMenu = document.querySelector("#sort-menu")
}


function bindEvents() {
    inputForm.addEventListener("submit", event => handleSubmit(event))
    tabButton.forEach(tab => {
        tab.addEventListener("click", event => handleTabClick(event))
    })
    sortMenu.addEventListener("change", event => handleSort(event))
}


function initialize() {
    registerDOM()
    bindEvents()
    updateTodoList()
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))