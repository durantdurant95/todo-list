import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../services/todoService";
import { Todo } from "../types/todo";

export const useTodos = () => {
  const queryClient = useQueryClient();

  // Fetch todos only once when the component mounts
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      console.log("Fetching todos...");
      try {
        const result = await fetchTodos();
        console.log("Todos fetched successfully:", result);
        return result;
      } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
      }
    },
    // Prevent automatic refetching since the API doesn't persist changes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity, // Consider data always fresh
  });

  const addTodoMutation = useMutation({
    mutationFn: (todo: Omit<Todo, "id">) => addTodo(todo),
    onSuccess: (newTodo) => {
      // Apply optimistic update to add a todo
      queryClient.setQueryData(
        ["todos"],
        (oldData: { todos: Todo[] } | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            todos: [...oldData.todos, newTodo],
          };
        }
      );

      // Don't refetch - rely on our optimistic update
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: Partial<Todo>;
    }) => updateTodo(id, updatedFields),
    onMutate: async ({ id, updatedFields }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Get the current state
      const previousData = queryClient.getQueryData(["todos"]);

      // Perform an optimistic update
      queryClient.setQueryData(
        ["todos"],
        (oldData: { todos: Todo[] } | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            todos: oldData.todos.map((todo: Todo) =>
              todo.id === id ? { ...todo, ...updatedFields } : todo
            ),
          };
        }
      );

      // Return the previous data for potential rollback
      return { previousData };
    },
    onError: (err, variables, context) => {
      // If mutation fails, rollback to the previous value
      if (context?.previousData) {
        queryClient.setQueryData(["todos"], context.previousData);
      }
      console.error("Error updating todo:", err);
    },
    onSuccess: (data) => {
      console.log("Todo updated successfully:", data);
      // We already applied the update optimistically, so no need to refetch
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Get the current state
      const previousData = queryClient.getQueryData(["todos"]);

      // Perform an optimistic update to remove the todo
      queryClient.setQueryData(
        ["todos"],
        (oldData: { todos: Todo[]; total: number } | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            todos: oldData.todos.filter((todo) => todo.id !== id),
            total: oldData.total - 1,
          };
        }
      );

      // Return the previous data for potential rollback
      return { previousData };
    },
    onError: (err, id, context) => {
      // If mutation fails, rollback to the previous value
      if (context?.previousData) {
        queryClient.setQueryData(["todos"], context.previousData);
      }
      console.error("Error deleting todo:", err);
    },
    onSuccess: (data) => {
      console.log("Todo deleted successfully:", data);
      // We already removed the todo optimistically, so no need to refetch
    },
  });

  return {
    todos: todosQuery.data?.todos || [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
};
