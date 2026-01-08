const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const taskService = {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}?_limit=10`);
            if(!response.ok) throw new Error('Ошибка получения api');
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
                    userId: crypto.randomUUID(),
                    title: newTaskData.title,
                    completed: false,
                    priority: "low",
                    createdAt: new Date().getTime(),

                }),
                 headers: {
                    'Content-Type': 'application/json',
                },
            })
        } catch (error) {
            console.log(" Failed to create task", error)
        }
    },
}