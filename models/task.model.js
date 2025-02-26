import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
