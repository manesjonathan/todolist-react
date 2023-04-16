import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {FaTrash} from "react-icons/fa";
import Swal from "sweetalert2";
import {deleteTask} from "../backend/backend.js";

function ShoppingList() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        // Fetch items from backend
        // Example code: fetchItems().then((response) => setItems(response));
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);

        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);

        // Update item order in backend
        // Example code: updateItemOrder(newItems);
    };

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
                //deleteTask(id);
                setItems(items.filter((item) => item.id !== id));
            }
        })

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            return;
        }
        const newItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: inputValue.trim(),
            quantity: 1,
        };
        // Add item to backend
        // Example code: addItem(newItem);
        setItems([...items, newItem]);
        setInputValue("");
    };

    const handleQuantityChange = (id, quantity) => {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item.id === id);
        newItems[index].quantity = quantity;
        setItems(newItems);
    };

    return (
        <>
            <main className="bg-main-bg bg-no-repeat bg-cover min-h-screen">
                <div className="flex justify-center">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="mt-28 flex flex-col text-center">
                            <h2 className="text-2xl font-bold mb-4 text-gray-50">Shopping List</h2>
                            <Droppable droppableId="items">
                                {(provided) => (
                                    <div
                                        className="bg-gray-100 p-4 rounded-lg max-h-screen overflow-y-auto h-fit w-80"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {items && <p className="text-gray-500 text-sm mb-2">Ajoute des articles</p>}
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
                                                        <div className={'flex justify-end'}>
                                                            <div className={'flex'}>
                                                                <button
                                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg mt-2"
                                                                    onClick={() => {
                                                                        const newItems = [...items];
                                                                        const itemIndex = newItems.findIndex(
                                                                            (newItem) => newItem.id === item.id
                                                                        );
                                                                        newItems[itemIndex].quantity--;
                                                                        setItems(newItems);
                                                                    }}>
                                                                    -
                                                                </button>
                                                                <p className={'bg-gray-300 px-2 py-1 rounded-lg mt-2'}>
                                                                    {item.quantity}
                                                                </p>
                                                                <button
                                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg mt-2"
                                                                    onClick={() => {
                                                                        const newItems = [...items];
                                                                        const itemIndex = newItems.findIndex(
                                                                            (newItem) => newItem.id === item.id
                                                                        );
                                                                        newItems[itemIndex].quantity++;
                                                                        setItems(newItems);
                                                                    }}>
                                                                    +
                                                                </button>
                                                            </div>
                                                            <button
                                                                className="ml-4 bg-gray-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg mt-2"
                                                                onClick={() => handleDelete(item.id)}>
                                                                <FaTrash/>
                                                            </button>
                                                        </div>
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

export default ShoppingList;
