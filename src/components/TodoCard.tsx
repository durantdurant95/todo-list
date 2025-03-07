import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import {
  checkmarkCircleOutline,
  ellipseOutline,
  trashOutline,
} from "ionicons/icons";
import { Todo } from "../types/todo";

interface TodoCardProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <IonCard
      className={`mb-3 transition-all duration-300 ${
        todo.completed ? "bg-gray-50" : "bg-white"
      }`}
    >
      <IonCardContent className="p-0">
        <div className="flex items-center p-4">
          <div
            className="cursor-pointer flex-shrink-0 mr-4"
            onClick={() => onToggle(todo)}
          >
            <IonIcon
              icon={todo.completed ? checkmarkCircleOutline : ellipseOutline}
              className={`text-2xl ${
                todo.completed ? "text-green-600" : "text-gray-400"
              }`}
            />
          </div>

          <div
            className="flex-grow cursor-pointer"
            onClick={() => onToggle(todo)}
          >
            <p
              className={`text-lg transition-all duration-300 ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {todo.todo}
            </p>
          </div>

          <div
            className="flex-shrink-0 cursor-pointer ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => onDelete(todo.id)}
          >
            <IonIcon icon={trashOutline} className="text-red-500 text-xl" />
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default TodoCard;
