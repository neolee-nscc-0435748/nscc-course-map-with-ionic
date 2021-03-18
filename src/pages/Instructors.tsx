import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./Instructors.css";
import InstructorsList from "../components/InstructorsList";
import Instructor from "../models/Instructor";
import axios from "axios";

const Instructors: React.FC = () => {
  const instructorsData: Instructor[] = [];
  const [instructors, setInstructors]: [Instructor[], (instructors: Instructor[]) => void] = useState(instructorsData);

  const getInstructorsData = async () => {
    return new Promise(async (resolve: (value: Instructor[]) => void, reject) => {
      const response = await axios.get("https://webd3000functions-apim.azure-api.net/webd3000functions/instructors");

      if (response.status === 200) {
        console.debug(response.data);

        resolve(response.data);
      } else {
        reject("Unable to access data");
      }
    });
  };

  useEffect(() => {
    (async () => {
      console.log("use effect");
      try {
        const data = await getInstructorsData();
        setInstructors(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getInstructorsData();
      setInstructors(data);
      event.detail.complete();
    } catch (err) {
      //inform the user that a problem occurred (some kind of alert)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Instructors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <InstructorsList instructors={instructors} />
      </IonContent>
    </IonPage>
  );
};

export default Instructors;
