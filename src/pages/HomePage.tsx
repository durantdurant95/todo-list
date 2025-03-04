import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const HomePage: React.FC = () => {
  return (
    <IonPage id="main-content">
      <IonHeader>
        {/* <IonTitle>Mis tareas</IonTitle> */}
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Mis tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Tap the button in the toolbar to open the menu.
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
