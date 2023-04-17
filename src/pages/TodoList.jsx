import React, {useEffect, useState} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {createTask, getTasks, updateTask} from "./../backend/backend.js";
import getDraggable from "../components/TaskDisplay.jsx";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState('');

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
        updateTask(taskId, text, newStatus, newPosition, currentTask.end_date);

        setTasks(newTasks);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            return;
        }
        const newTodo = {
            id: Math.random().toString(36).substr(2, 9),
            text: inputValue.trim(),
            status: 'todo',
            position: tasks.length,
            end_date: selectedDateTime
        };
        createTask(inputValue.trim(), "todo", tasks.length, new Date(selectedDateTime));
        setTasks([...tasks, newTodo]);
        setInputValue('');
        setSelectedDateTime(null);
    };

    const getList = (status) => tasks.filter((task) => task.status === status);

    return (
        <>
            <main className="bg-main-bg bg-no-repeat bg-cover min-h-screen">
                <div className="flex justify-center">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="mt-28 flex flex-col lg:grid lg:grid-cols-3 gap-8 space-y-4 lg:space-y-0">
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
                    <div className="flex justify-center py-8">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="p-2 border-2 border-gray-500 rounded-l-md"
                        />
                        <input
                            type="datetime-local"
                            onChange={(e) => setSelectedDateTime(e.target.value)}
                            className="p-2 border-2 border-gray-500"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md">
                            Ajouter
                        </button>
                    </div>
                </form>
            </main>
        </>
    );

}

export default TodoList;
