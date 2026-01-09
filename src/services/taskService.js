// const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_URL = 'http://localhost:3001/tasks';

export const taskService = {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}?_limit=10`);
            if (!response.ok) throw new Error('Ошибка получения api');
            return await response.json()
        } catch (error) {
            console.log("Failed to fetch tasks: ", error)
        }
    },

    async createTask(newTaskData) { // newTaskData содержит title, priority и тд..
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                body: JSON.stringify({
                    title: newTaskData.title,
                    isCompleted: newTaskData.isCompleted || false,
                    status: newTaskData.status || "not_started",
                    priority: newTaskData.priority || "low",
                    createdAt: Date.now(),

                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            // проверяем статус ответа, затем распарсить json, вернуть данные
            if (!response.ok) throw new Error("Ошибка создания задачи");
            const createdTask = await response.json();
            return createdTask;
        } catch (error) {
            console.log(" Failed to create task", error)
        }

    },
}