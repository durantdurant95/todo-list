import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addTodo } from "../services/todoService";
import { Todo } from "../types/todo";

const AddTaskPage: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useIonRouter();
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: Omit<Todo, "id">) => addTodo(newTodo),
    onSuccess: (newTodo) => {
      // Update the cache with the new todo
      queryClient.setQueryData(
        ["todos"],
        (oldData: { todos: Todo[] } | undefined) => {
          if (!oldData)
            return { todos: [newTodo], total: 1, skip: 0, limit: 10 };

          return {
            ...oldData,
            todos: [...oldData.todos, newTodo],
          };
        }
      );

      // Navigate back to home page
      router.goBack();
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
      setIsSubmitting(false);
    },
  });

  const handleSave = () => {
    if (!taskName.trim()) {
      // Show validation error
      alert("Task name is required");
      return;
    }

    setIsSubmitting(true);

    // Combine name and description if both are provided
    const todoText = taskDescription
      ? `${taskName} - ${taskDescription}`
      : taskName;

    // Call mutation to add the todo
    addTodoMutation.mutate({
      todo: todoText,
      completed: false,
      userId: 1, // Using a default userId
    });
  };

  return (
    <IonPage>
      <IonToolbar className="p-[14px] border-b">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Atrás</IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding">
        <div className="flex flex-col gap-4 p-4">
          <div className="mb-4">
            <h3 className="block text-sm font-medium text-gray-700 mb-1">
              Título de la tarea
            </h3>
            <IonInput
              className="border rounded-md px-3 py-2"
              placeholder="Ejemplo 1"
              value={taskName}
              onIonChange={(e) => setTaskName(e.detail.value || "")}
            />
          </div>

          <div className="mb-4">
            <h3 className="block text-sm font-medium text-gray-700 mb-1">
              Descripción de la tarea
            </h3>
            <IonTextarea
              className="border rounded-md px-3 py-2"
              placeholder="Ejemplo de descripción de tarea: Redactar un informe sobre las tendencias del mercado en La Habana, Cuba."
              value={taskDescription}
              onIonChange={(e) => setTaskDescription(e.detail.value || "")}
              rows={20}
            />
          </div>
          <IonButton
            expand="block"
            onClick={handleSave}
            disabled={isSubmitting || !taskName.trim()}
            className="normal-case text-primary"
            color="dark"
            fill="outline"
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddTaskPage;
