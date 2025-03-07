import {
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

export default function Toolbar() {
  return (
    <IonToolbar className="p-4">
      <IonButtons slot="start">
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>Mis tareas</IonTitle>
      <IonButton
        slot="end"
        fill="outline"
        color="dark"
        className="normal-case text-primary"
      >
        Nueva tarea
        <IonIcon
          aria-hidden="true"
          slot="end"
          className="pl-2"
          ios={addOutline}
          md={addOutline}
        />
      </IonButton>
    </IonToolbar>
  );
}
