import axios from "axios";
import { Todo, TodosResponse } from "../types/todo";

const API_URL = "https://dummyjson.com";

export const fetchTodos = async (): Promise<TodosResponse> => {
  const response = await axios.get<TodosResponse>(`${API_URL}/todos?limit=10`);
  return response.data;
};

export const fetchTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get<Todo>(`${API_URL}/todos/${id}`);
  return response.data;
};

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_URL}/todos/add`, todo);
  return response.data;
};

export const updateTodo = async (
  id: number,
  updatedFields: Partial<Todo>
): Promise<Todo> => {
  // Ensure we're sending the proper format according to dummyjson API
  const response = await axios.put<Todo>(
    `${API_URL}/todos/${id}`,
    updatedFields,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("Todo updated response:", response.data);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await axios.delete<Todo>(`${API_URL}/todos/${id}`);
  return response.data;
};
