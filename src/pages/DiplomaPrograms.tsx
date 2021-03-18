import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./DiplomaPrograms.css";
import DiplomaProgramsList from "../components/DiplomaProgramsList";
import DiplomaProgram from "../models/DiplomaProgram";
import axios from "axios";

const DiplomaPrograms: React.FC = () => {
  const diplomaProgramsData: DiplomaProgram[] = [];
  const [diplomaPrograms, setDiplomaPrograms]: [DiplomaProgram[], (academicYears: DiplomaProgram[]) => void] = useState(
    diplomaProgramsData
  );

  const getDiplomaProgrmasData = async () => {
    return new Promise(async (resolve: (value: DiplomaProgram[]) => void, reject) => {
      const response = await axios.get(
        "https://webd3000functions-apim.azure-api.net/webd3000functions/diplomaprograms"
      );

      if (response.status === 200) {
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
        const data = await getDiplomaProgrmasData();
        setDiplomaPrograms(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getDiplomaProgrmasData();
      setDiplomaPrograms(data);
      event.detail.complete();
    } catch (err) {
      //inform the user that a problem occurred (some kind of alert)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DiplomaPrograms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <DiplomaProgramsList diplomaprograms={diplomaPrograms} />
      </IonContent>
    </IonPage>
  );
};

export default DiplomaPrograms;
