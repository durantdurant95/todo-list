import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import TodoCard from "../components/TodoCard";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/todo";

const HomePage: React.FC = () => {
  const { todos, isLoading, isError, updateTodo, deleteTodo } = useTodos();
  const history = useHistory();

  const navigateToAddTask = () => {
    history.push("/add-task");
  };

  // Separate todos into unchecked and checked arrays
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleToggle = (todo: Todo) => {
    console.log("Toggling todo:", todo);
    updateTodo({
      id: todo.id,
      updatedFields: { completed: !todo.completed },
    });
  };

  const handleDelete = (id: number) => {
    console.log("Deleting todo with ID:", id);
    deleteTodo(id);
  };

  if (isLoading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="flex justify-center items-center h-full">
            <IonSpinner />
            <p className="ml-2">Loading todos...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (isError) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="p-4 text-red-600">
            Error loading todos. Please try again later.
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonToolbar className="p-[14px] border-b">
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Mis tareas</IonTitle>
        <IonButton
          slot="end"
          fill="outline"
          color="dark"
          className="normal-case text-primary"
          onClick={navigateToAddTask}
        >
          Nuevo
          <IonIcon
            aria-hidden="true"
            slot="end"
            className="pl-2"
            ios={addOutline}
            md={addOutline}
          />
        </IonButton>
      </IonToolbar>
      <IonContent className="ion-padding">
        <div className="p-4">
          {/* Uncompleted Todos Section */}
          <div className="mb-8">
            <h6 className="text-lg font-semibold mb-3 text-gray-700 pb-2">
              Por Hacer ({uncompletedTodos.length})
            </h6>
            {uncompletedTodos.length > 0 ? (
              <div className="flex flex-col gap-1 pt-2">
                {uncompletedTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Sin tareas pendientes, buen trabajo.
                </p>
              </div>
            )}
          </div>

          {/* Completed Todos Section */}
          <div>
            <h6 className="font-semibold mb-3 text-gray-700 border-b pb-2">
              Terminados ({completedTodos.length})
            </h6>
            {completedTodos.length > 0 ? (
              <div className="flex flex-col gap-1 pt-2">
                {completedTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No completed tasks yet.</p>
              </div>
            )}
          </div>

          {todos.length === 0 && (
            <div className="text-center p-6 bg-gray-50 rounded-lg mt-4">
              <p className="text-gray-500">
                No todos yet. Add one to get started.
              </p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
