import { IonContent, IonPage } from "@ionic/react";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-content-fullscreen">
        <div className="p-4">
          Tap the button in the toolbar to open the menuuuu.
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
