import Todo from "../models/todo.model.js";

export const postTodo = async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: "Task description is required" });
    }
    try {
        await Todo.create({ task, user: req.user });
        return res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getYourTodo = async (req, res) => {
    try {
        const user = req.user
        const todos = await Todo.find({ user })
        return res.status(200).json(todos);
    } catch (error) {
        console.error("Error getting todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const toggleIsCompleted = async (req, res) => {
    try {
        const todoid = req.params.id
        const { isCompleted } = req.body
        const todo = await Todo.findOneAndUpdate(
            { _id: todoid },
            { completed: isCompleted },
            { new: true }
        )
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json(todo);
    } catch (error) {
        console.error("Error getting todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const editTodo = async (req, res) => {
    const todoid = req.params.id
    const { task } = req.body
    if (!task || typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({ message: "Invalid task data" });
    }
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: todoid },
            { task },
            { new: true }
        )
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json(todo);
    } catch (error) {
        console.error("Error updating todo:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteTodo = async (req, res) => {
    const todoid = req.params.id
    try {
        const todo = await Todo.findOneAndDelete({ _id: todoid })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo Deleted" });
    } catch (error) {
        console.error("Error deleting todo:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await Todo.findById({ _id: id })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json(todo);
    } catch (error) {
        console.error("Error getting todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
