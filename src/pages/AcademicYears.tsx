import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./AcademicYears.css";
import AcademicYearsList from "../components/AcademicYearsList";
import AcademicYear from "../models/AcademicYear";
import axios from "axios";

const AcademicYears: React.FC = () => {
  const academicYearsData: AcademicYear[] = [];
  const [academicYears, setAcademicYears]: [AcademicYear[], (academicYears: AcademicYear[]) => void] = useState(
    academicYearsData
  );

  const getAcademicYearsData = async () => {
    return new Promise(async (resolve: (value: AcademicYear[]) => void, reject) => {
      const response = await axios.get("https://webd3000functions-apim.azure-api.net/webd3000functions/academicyears");

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
        const data = await getAcademicYearsData();
        setAcademicYears(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getAcademicYearsData();
      setAcademicYears(data);
      event.detail.complete();
    } catch (err) {
      //inform the user that a problem occurred (some kind of alert)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Academic Years</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <AcademicYearsList academicyears={academicYears} />
      </IonContent>
    </IonPage>
  );
};

export default AcademicYears;
