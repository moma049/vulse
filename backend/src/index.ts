import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API is working');
});

app.get('/todolists', async (req, res) => {
  try {
    const todoLists = await prisma.toDoList.findMany();
    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the to-do lists' });
  }
});

app.get('/todolists/:id/items', async (req, res) => {
  try {
    const { id } = req.params;
    const items = await prisma.toDoItem.findMany({
      where: { todoListId: Number(id) },
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the to-do items' });
  }
});

app.post('/todolists', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const todoList = await prisma.toDoList.create({
      data: { title },
    });
    res.json(todoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the to-do list' });
  }
});

app.post('/todolists/:id/items', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const newItem = await prisma.toDoItem.create({
      data: {
        content,
        completed: false,
        todoListId: Number(id),
      },
    });
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the to-do item' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedItem = await prisma.toDoItem.update({
      where: { id: Number(id) },
      data: { completed },
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the to-do item' });
  }
});

app.delete('/todolists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.toDoList.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the to-do list' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.toDoItem.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the to-do item' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
