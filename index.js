"use strict";
//Defining the constants required for the program
const addButton = document.getElementById("addButton");
const textBox = document.getElementById("taskBox");
const table = document.getElementById("table1");

//rowNum variable used to hold the value of current row on which operationis being performed
let rowNum = 0;

//arrTaskNames array which holds the values of all the tasks in the table
let arrTaskNames = ["heading"]

//adding the eventListener to the addButton
addButton.addEventListener("click", addToTable);

//this function adds new rows to the table
function addToTable() {
    //taskName takes the value from the textBox
    //doesnt run if textBox is empty
    if (textBox.value.trim() != "") {
        let taskName = textBox.value;
        //adds the task to the arrTaskNames array
        arrTaskNames.push(taskName);
        //inserting a new row in the table object
        let row = table.insertRow();
        //adding two cells to the table, one for displaying the task, one for showing the update and delete buttons
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        //html code for the update button, ive used the taskname as the unique ID for each button
        let editButton = `<button type="button" name=${taskName} onclick="editRow(name)">Edit</button>`
        let deleteButton = `<button type="button" name=${taskName} onclick=deleteRow(name)>Delete</button>`
        //changing the text of the cells
        cell1.innerText = taskName;
        //adding the two buttons to the second cell
        cell2.innerHTML = editButton + deleteButton;
    }  
}
//this function deletes a row, it accepts the name parameter
function deleteRow(name) {
    //gets the row number of the task using the arrTaskNames array
    rowNum = arrTaskNames.indexOf(name);
    //delete the row number from the table
    table.deleteRow(rowNum);
    //removes the task from the array as well
    arrTaskNames.splice(rowNum, 1);
    //resets the value of rowNum to 0
    rowNum = 0;
}
//this function changes the task in a particular row
function updateRow() {
    //gets the new task from the textbox
    let newTask = textBox.value;
    //changes the row to show the new task
    table.rows[rowNum].cells.item(0).innerHTML = newTask;
    //changes the text of the button again
    addButton.innerText = "Add";
    //removes the update function from the listener and adds the addRow function back
    addButton.removeEventListener("click", updateRow);
    addButton.addEventListener("click", addToTable);
    //resets rowNum back to 0
    rowNum = 0;
}
//this function changes the value of the button and calls the updaterow function
function editRow(name) {
    //gets the rownumber of the row to be edited
    rowNum = arrTaskNames.indexOf(name);
    //gets the content of the target row
    let rowContent = table.rows[rowNum].cells.item(0).innerHTML;
    //displays the task on the textbox
    textBox.value = rowContent;
    //changes the add button to show update
    addButton.innerText = "Update";
    //removes the addfunction from the button and adds the update function to the button
    addButton.removeEventListener("click", addToTable);
    addButton.addEventListener("click", updateRow);
}