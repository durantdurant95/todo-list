import {
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useHistory } from "react-router";

export default function Toolbar() {
  const history = useHistory();

  const navigateToAddTask = () => {
    history.push("/add-task");
  };
  return (
    <>
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
    </>
  );
}
