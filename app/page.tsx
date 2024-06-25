"use client";

import { useState, useEffect } from 'react';
import { createToDoList, deleteToDoList, getToDoListItems, addToDoItem, deleteToDoItem } from '../services/api';
import Sidebar from './components/Sidebar';
import './globals.css';

interface ToDoList {
  id: number;
  title: string;
}

interface ToDoItem {
  id: number;
  content: string;
  completed: boolean;
  todoListId: number;
}

const Home = () => {
  const [toDoLists, setToDoLists] = useState<ToDoList[]>([]);
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  const [items, setItems] = useState<ToDoItem[]>([]);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // Load to-do lists from the server when the component mounts
    const fetchToDoLists = async () => {
      try {
        const response = await fetch('http://localhost:3001/todolists');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setToDoLists(data);
      } catch (error) {
        console.error('Error fetching to-do lists:', error);
      }
    };
    fetchToDoLists();
  }, []);

  const fetchItems = async (listId: number) => {
    const response = await getToDoListItems(listId);
    setItems(response.data);
  };

  const handleCreateList = async (title: string) => {
    try {
      const response = await createToDoList(title);
      setToDoLists([...toDoLists, response.data]);
    } catch (error) {
      console.error('Error creating to-do list:', error);
    }
  };

  const handleDeleteList = async (id: number) => {
    try {
      await deleteToDoList(id);
      setToDoLists(toDoLists.filter(list => list.id !== id));
      if (currentListId === id) {
        setCurrentListId(null);
        setItems([]);
      }
    } catch (error) {
      console.error('Error deleting to-do list:', error);
    }
  };

  const handleListSelect = (id: number) => {
    setCurrentListId(id);
    fetchItems(id);
  };

  const handleAddItem = async () => {
    try {
      if (currentListId) {
        const response = await addToDoItem(currentListId, content);
        setItems([...items, response.data]);
        setContent('');
      }
    } catch (error) {
      console.error('Error adding to-do item:', error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteToDoItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting to-do item:', error);
    }
  };

  return (
    <div className="container">
      <Sidebar
        toDoLists={toDoLists}
        currentListId={currentListId}
        onListSelect={handleListSelect}
        onDeleteList={handleDeleteList}
        onCreateList={handleCreateList}
      />
      <div className="main">
        <h1>To-Do List App</h1>
        {currentListId && (
          <div>
            <h2>Items</h2>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="New Item"
              style={{ color: 'black' }} // Added inline style for black text
            />
            <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Add Item</button>
            <ul>
              {items.map(item => (
                <li key={item.id} className="todo-item">
                  {item.content}
                  <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .sidebar {
          width: 200px;
          padding: 20px;
          background-color: #f4f4f4;
          border-right: 1px solid #ddd;
        }
        .main {
          flex: 1;
          padding: 20px;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
        }
        .sidebar li {
          margin-bottom: 10px;
        }
        .sidebar li.active {
          font-weight: bold;
        }
        .todo-item {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Home;
