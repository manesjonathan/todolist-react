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
        updateTask(task.id, text.value, task.status, task.position, task.end_date ?? null);

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
        updateTask(task.id, task.text, task.status, task.position, dateToSave.toISOString());
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
                    <EditText
                        name="textbox"
                        defaultValue={task.text}
                        onSave={handleEditText}
                    />
                    <div className="text-gray-500 text-xs">
                        <EditText
                            name="textbox"
                            defaultValue={task.end_date !== null ? new Date(task.end_date).toLocaleString().substring(0, 16) : new Date().toLocaleString().substring(0, 16)}
                            onSave={handleEditDate}
                        />
                    </div>

                    <div className={'flex justify-end'}>
                        <button
                            className="bg-gray-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg mt-2"
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
