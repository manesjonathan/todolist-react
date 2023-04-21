import {Draggable} from "react-beautiful-dnd";
import {FaTrash} from "react-icons/fa";
import React from "react";
import {deleteTask, updateTask} from "../backend/backend.js";
import Swal from "sweetalert2";
import {EditText} from 'react-edit-text';

const getDraggable = (tasks, task, setTasks) => {
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Es-tu sûr?',
            text: "Cette action est irréversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprime-le!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(id);
                setTasks(tasks.filter((task) => task.id !== id));
            }
        })

    };

    const handleEditText = (text) => {
        updateTask(task.id, text.value, task.status, task.position, task.end_date ?? null, task.assignee ?? null);
    }
    const handleEditDate = (date) => {
        const parts = date.value.split(" ");
        const dateParts = parts[0].split("/");
        const timeParts = parts[1].split(":");
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[0], 10);
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);

        const dateToSave = new Date(year, month, day, hour, minute);
        updateTask(task.id, task.text, task.status, task.position, dateToSave.toISOString(), task.assignee ?? null);
        setTasks(tasks.map((t) => {
            if (t.id === task.id) {
                return {
                    ...t,
                    end_date: dateToSave.toISOString(),
                }
            }
            return t;
        }));
    }


    const handleAssignee = (e) => {
        const newTask = {
            ...task,
            assignee: e.target.value
        };
        updateTask(newTask.id, newTask.text, newTask.status, newTask.position, newTask.end_date ?? null, newTask.assignee).then((response) => {
            setTasks(tasks.map((t) => {
                if (t.id === task.id) {
                    return {
                        ...t,
                        assignee: response.assignee,
                    }
                }
                return t;
            }));
        });
    }

    return <Draggable
        key={task.id}
        draggableId={task.id.toString()}
        index={tasks.findIndex((t) => t.id === task.id)}>
        {(provided) => {
            return (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="bg-white p-2 rounded-lg shadow-md mb-2">
                    <div className="flex items-center">
                        <input type="radio" name={task.id} value={1}
                               className="rounded-full h-4 w-4 mr-2 bg-green-500"
                               style={{accentColor: "rgb(249 168 212)"}}
                               onChange={handleAssignee}
                               checked={task.assignee === 1 && task.assignee !== null}
                        />
                        <input type="radio" name={task.id} value={2}
                               className="rounded-full h-4 w-4 mr-2 bg-red-500"
                               style={{accentColor: "rgb(49 46 129)"}}
                               checked={task.assignee === 2 && task.assignee !== null}
                               onChange={handleAssignee}/>
                        <EditText
                            name="textbox"
                            defaultValue={task.text}
                            onSave={handleEditText}
                        />
                    </div>


                    <div className="text-gray-500 text-xs">
                        <EditText
                            name="textbox"
                            defaultValue={task.end_date !== null ? new Date(task.end_date).toLocaleString().substring(0, 16) : new Date().toLocaleString().substring(0, 16)}
                            onSave={handleEditDate}
                        />
                    </div>

                    <div className={'flex justify-end'}>
                        <button
                            className="bg-gray-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm"
                            onClick={() => handleDelete(task.id)}>
                            <FaTrash/>
                        </button>

                    </div>

                </div>
            );
        }}
    </Draggable>
}

export default getDraggable;
