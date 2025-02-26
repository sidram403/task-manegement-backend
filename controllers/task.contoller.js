
import Task from "../models/task.model.js";

// ✅ Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, category, dueDate } = req.body;
    const userId = req.userId; // Assuming authentication middleware provides user ID

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      owner: userId,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

// ✅ Get all tasks for the authenticated user
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ owner: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
};

// ✅ Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, owner: userId },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const updatedTaskStatus = await Task.findOneAndUpdate(
      { _id: id, owner: userId },
      {status},
      { new: true }
    );

    if (!updatedTaskStatus) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task status', error });
  }
};

// ✅ Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedTask = await Task.findOneAndDelete({ _id: id, owner: userId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};