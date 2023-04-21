import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

function PromiseList() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {

    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            return;
        }
        const newItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: inputValue.trim(),
            position: items.length,
        };

        setItems([...items, newItem]);
        setInputValue("");
        //createItem(newItem.name, newItem.quantity, newItem.position);
    };


    return (
        <>
            <main className="bg-main-bg bg-no-repeat bg-cover min-h-[calc(100vh-55px)]">
                <div className="flex justify-center">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="mt-14 flex flex-col text-center">
                            <h2 className="text-2xl font-bold mb-4 text-gray-50 uppercase">Liste de promesses</h2>
                            <Droppable droppableId="items">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg max-h-screen overflow-y-auto h-fit w-80"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {items.length === 0 &&
                                            <p className="text-gray-500 text-sm mb-2">Ajoute des promesses</p>}
                                        {items.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id.toString()}
                                                index={index}>
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="bg-white p-2 rounded-lg shadow-md mb-2 flex items-center justify-between">
                                                        <p>{item.name}</p>
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
                    <div className="flex justify-center py-8">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="p-2 border-2 border-gray-500 rounded-l-md"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r rounded-l-none"
                        >Ajouter
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default PromiseList;
