const todoList = []
let inputForm, todoMain, tabButton, sortMenu
let displayTarget = "inbox"
let sortIndex = "created-desc"


funciton createTodoHtmlString(todo) {
    let htmlString = ""
    const editType = todo.isEdit ? "editFixed" : "edit"
    const editButtonLabel = todo.isEdit ? "編集完了" : "編集"
    const doneType = todo.isDone ? "inbox" : "done"
    const doneButtonLabel = todo.isDone ? "未完了" : "完了"
    let todoTextCell, priortyCell
    if (todo.isEdit) {
        todoTextCell = 
            '<td class="cell-text"><input class="input-edit" type=""text" value=' +
            todo.text +
            " /></td>"
        priorityCell = 
            '<td class="cell-priority><input class="input-priority type="number" value=' +
            todo.priority +
            " /></td>"
    } else {
        todoTextCell = '<td class="cell-text">' + todo.text + "</td>"
        priorityCell = '<td class="cell-priority">' + todo.priority + "</td>"
    }
    htmlString += '<tr id=" ' + todo.id + '">'
    htmlString +=
        '<td class="cell-edit-button"><button data-type="' +
}