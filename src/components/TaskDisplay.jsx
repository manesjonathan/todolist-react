import {Draggable} from "react-beautiful-dnd";
import {FaEdit, FaTrash} from "react-icons/fa";
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

    const handleEdit = (text) => {
        updateTask(task.id, text.value, task.status);

    }

    return <Draggable
        key={task.id}
        draggableId={task.id.toString()}
        index={tasks.findIndex((t) => t.id === task.id)}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="bg-white p-2 rounded-lg shadow-md mb-2">
                <EditText
                    name="textbox"
                    defaultValue={task.text}
                    onSave={handleEdit}
                />

                <div className={'flex justify-end'}>
                    <button
                        className="bg-gray-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg mt-2"
                        onClick={() => handleDelete(task.id)}>
                        <FaTrash/>
                    </button>

                </div>
            </div>
        )}
    </Draggable>;
}

export default getDraggable;
