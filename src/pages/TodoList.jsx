import React, {useEffect, useState} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {createTask, getTasks, updateTask} from "./../backend/backend.js";
import getDraggable from "../components/TaskDisplay.jsx";
import moment from "moment-timezone";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm'));

    useEffect(() => {
        getTasks().then((response) => {
            response.sort((a, b) => a.position - b.position);
            setTasks(response);
        });
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newTasks = Array.from(tasks);
        const [currentTask] = newTasks.splice(result.source.index, 1);

        if (result.source.droppableId === result.destination.droppableId) {
            newTasks.splice(result.destination.index, 0, currentTask);
        } else {
            newTasks.splice(result.destination.index, 0, {...currentTask, status: result.destination.droppableId});
        }

        const taskId = currentTask.id;
        const newStatus = result.destination.droppableId;
        const text = currentTask.text;
        const newPosition = result.destination.index;
        updateTask(taskId, text, newStatus, newPosition, currentTask.end_date ?? null, currentTask.assignee ?? null);

        setTasks(newTasks);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            return;
        }

        createTask(inputValue.trim(), "todo", tasks.length, selectedDateTime !== '' ? selectedDateTime : null, null).then((response) => {
            setTasks([...tasks, response]);
            setInputValue('');
            setSelectedDateTime(null);
        });

    };

    const getList = (status) => tasks.filter((task) => task.status === status);

    return (

        <main className="bg-main-bg bg-no-repeat bg-cover min-h-screen">
            <div className="flex justify-center">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="mt-28 flex flex-col lg:grid lg:grid-cols-3 gap-16 space-y-4 lg:space-y-0">
                        <div className="w-full">
                            <Droppable droppableId="todo">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg max-h-screen overflow-y-auto h-fit w-80"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <h2 className="text-lg font-bold mb-4">A Faire</h2>
                                        {getList("todo").map((task) => getDraggable(tasks, task, setTasks))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className="w-full">
                            <Droppable droppableId="doing">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg max-h-screen overflow-y-auto h-fit w-80"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <h2 className="text-lg font-bold mb-4">En Cours</h2>
                                        {getList("doing").map((task) => getDraggable(tasks, task, setTasks))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className="w-full">
                            <Droppable droppableId="done">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg max-h-screen overflow-y-auto h-fit w-80"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <h2 className="text-lg font-bold mb-4">Fini</h2>
                                        {getList("done").map((task) => getDraggable(tasks, task, setTasks))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch py-8 m-auto w-80 lg:w-1/2">
                    <input
                        type="text"
                        value={inputValue}
                        placeholder="Ajouter une tâche"
                        onChange={(e) => setInputValue(e.target.value)}
                        className="p-4 lg:p-2 border-2 border-gray-500 mt-2 lg:mx-2 w-full"
                    />
                    <input
                        type="datetime-local"
                        onChange={(e) => setSelectedDateTime(e.target.value)}
                        defaultValue={selectedDateTime}
                        className="p-4 lg:p-2 border-2 border-gray-500 mt-2 lg:mx-2 w-full"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-4 lg:p-2 rounded-r-md mt-2 lg:mx-2 w-full uppercase">
                        Ajouter
                    </button>
                </div>
            </form>
        </main>

    );
}

export default TodoList;
