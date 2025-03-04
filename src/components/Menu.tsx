import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import {
  bookmarkOutline,
  bookmarkSharp,
  homeOutline,
  homeSharp,
  personOutline,
  personSharp,
} from "ionicons/icons";

type MenuLink = {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
};

const menuLinks: MenuLink[] = [
  {
    title: "Inicio",
    url: "/",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Recientes",
    url: "/recientes",
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkSharp,
  },
  {
    title: "Manejar cuenta",
    url: "/cuenta",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
];

const Menu: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg", // placeholder avatar
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        {/* User Info Section */}
        <div className="p-4 flex items-center space-x-3 border-b">
          <IonAvatar className="w-10 h-10">
            <img src={user.avatar} alt="User avatar" className="rounded-full" />
          </IonAvatar>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <IonNote className="text-sm text-primary">{user.email}</IonNote>
          </div>
        </div>

        {/* Navigation Links */}
        <IonList className="py-2 px-3 ">
          {menuLinks.map((item, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    className="pr-2"
                    ios={item.iosIcon}
                    md={item.mdIcon}
                  />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
