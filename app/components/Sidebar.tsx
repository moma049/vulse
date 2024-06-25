"use client";

import React, { useState } from 'react';

interface SidebarProps {
  toDoLists: { id: number; title: string }[];
  currentListId: number | null;
  onListSelect: (id: number) => void;
  onDeleteList: (id: number) => void;
  onCreateList: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toDoLists, currentListId, onListSelect, onDeleteList, onCreateList }) => {
  const [newListTitle, setNewListTitle] = useState('');

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      onCreateList(newListTitle);
      setNewListTitle('');
    }
  };

  return (
    <div className="sidebar">
      <h2>To-Do Lists</h2>
      <form onSubmit={handleCreateList} className="mb-4">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New List Title"
          className="w-full p-2 border rounded mb-2 text-black" // Added text-black class
        />
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
          Create List
        </button>
      </form>
      <p className="text-sm text-gray-600 mb-4">Click list name to access to do items</p>
      <ul>
        {toDoLists.map(list => (
          <li key={list.id} className={currentListId === list.id ? 'active' : ''}>
            <span onClick={() => onListSelect(list.id)}>{list.title}</span>
            <button
              onClick={() => onDeleteList(list.id)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
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
        .sidebar button {
          margin-left: 10px;
        }
        .text-black {
          color: black; // Added this CSS rule
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
