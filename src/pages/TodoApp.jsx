import React, {useEffect, useState} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {createTask, getTasks, updateTask} from "./../backend/backend.js";
import getDraggable from "../components/TaskDisplay.jsx";

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sourceColumn, setSourceColumn] = useState("");

    useEffect(() => {
        getTasks().then((response) => {
            setTasks(response);
        });
    }, []);

    const handleDragStart = (result) => {
        setSourceColumn(result.source.droppableId);
    };

    const handleDragEnd = (result) => {
        setSourceColumn("");

        if (!result.destination) return;

        const newTasks = Array.from(tasks);
        const [removed] = newTasks.splice(result.source.index, 1);

        if (result.source.droppableId === result.destination.droppableId) {
            newTasks.splice(result.destination.index, 0, removed);
        } else {
            newTasks.splice(result.destination.index, 0, {...removed, status: result.destination.droppableId});
        }
        const taskId = removed.id;
        const newStatus = result.destination.droppableId;
        const text = removed.text;
        updateTask(taskId, text, newStatus)
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
        };
        createTask(inputValue.trim(), "todo");
        setTasks([...tasks, newTodo]);
        setInputValue('');
    };
    const getList = (status) => tasks.filter((task) => task.status === status);

    return (
        <>
            <main className="bg-main-bg bg-no-repeat bg-cover min-h-screen">
                <div className="flex justify-center">
                    <DragDropContext onDragEnd={handleDragEnd} handleDragStart={handleDragStart}>
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-16 lg:space-y-0 mt-28">
                            <Droppable droppableId="todo">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg min-w-[20rem] max-h-screen overflow-y-auto h-fit"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        <h2 className="text-lg font-bold mb-4">Todo</h2>
                                        {getList("todo").map((task, index) => getDraggable(tasks, task, setTasks))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="doing">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg min-w-[20rem] max-h-screen overflow-y-auto h-fit"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        <h2 className="text-lg font-bold mb-4">Doing</h2>
                                        {getList("doing").map((task, index) => getDraggable(tasks, task, setTasks))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="done">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg min-w-[20rem] max-h-screen overflow-y-auto h-fit"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        <h2 className="text-lg font-bold mb-4">Done</h2>
                                        {getList("done").map((task, index) => getDraggable(tasks, task, setTasks))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center py-8">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="p-2 border-2 border-gray-500 rounded-l-md"/>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md">
                            Ajouter
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default TodoApp;
