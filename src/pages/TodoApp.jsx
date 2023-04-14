import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {createTask, deleteTask, getTasks, updateTask} from "./../backend/backend.js";

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


    const getList = (status) => tasks.filter((task) => task.status === status);


    const handleDelete = (id) => {
        deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

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

    return (
        <div className="App">
            <header className="bg-gray-800 text-white py-2">
                <h1 className="text-2xl font-bold text-center">Todo List</h1>
            </header>
            <div className="flex justify-center mt-4">
                <DragDropContext onDragEnd={handleDragEnd} handleDragStart={handleDragStart}>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0 ">
                        <Droppable droppableId="todo">
                            {(provided) => (
                                <div
                                    className="bg-gray-100 p-4 rounded-lg min-w-[20rem] max-h-screen overflow-y-auto"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    <h2 className="text-lg font-bold mb-4">Todo</h2>
                                    {getList("todo").map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id.toString()}
                                            index={tasks.findIndex((t) => t.id === task.id)}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="bg-white p-2 rounded-lg shadow-md mb-2 ">
                                                    <p>{task.text}</p>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg mt-2"
                                                        onClick={() => handleDelete(task.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="doing">
                            {(provided) => (
                                <div
                                    className="bg-gray-100 p-4 rounded-lg min-w-[20rem] max-h-screen overflow-y-auto"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    <h2 className="text-lg font-bold mb-4">Doing</h2>
                                    {getList("doing").map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id.toString()}
                                            index={tasks.findIndex((t) => t.id === task.id)}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="bg-white p-2 rounded-lg shadow-md mb-2">
                                                    <p>{task.text}</p>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg mt-2"
                                                        onClick={() => handleDelete(task.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="done">
                            {(provided) => (
                                <div
                                    className="bg-gray-100 p-4 rounded-lg min-w-[20rem] max-h-screen overflow-y-auto"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    <h2 className="text-lg font-bold mb-4">Done</h2>
                                    {getList("done").map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id.toString()}
                                            index={tasks.findIndex((t) => t.id === task.id)}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="bg-white p-2 rounded-lg shadow-md mb-2">
                                                    <p>{task.text}</p>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg mt-2"
                                                        onClick={() => handleDelete(task.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center mt-4">
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
        </div>
    );
}

export default TodoApp;
