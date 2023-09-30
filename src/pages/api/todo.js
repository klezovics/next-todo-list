import nextConnect from 'next-connect';
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

const handler = nextConnect();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

handler
    .get(async (req, res) => {
        const todos = await Todo.find();
        res.json(todos);
    })
    .post(async (req, res) => {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json(newTodo);
    })
    .patch(async (req, res) => {
        const updatedTodo = await Todo.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.json(updatedTodo);
    })
    .delete(async (req, res) => {
        await Todo.findByIdAndDelete(req.body.id);
        res.status(204).end();
    });

export default handler;
