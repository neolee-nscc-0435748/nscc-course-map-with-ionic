import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
  IonButton,
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./AcademicYearSemesters.css";
import AcademicYearSemestersList from "../components/AcademicYearSemestersList";
import Semester from "../models/Semester";
import axios from "axios";

interface AcademicYearSemestersProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AcademicYearSemesters: React.FC<AcademicYearSemestersProps> = ({ match }) => {
  const academicYearSemestersData: Semester[] = [];
  const [academicYearSemesters, setAcademicYearSemesters]: [
    Semester[],
    (academicYearSemesters: Semester[]) => void
  ] = useState(academicYearSemestersData);

  const getAcademicYearSemestersData = async () => {
    return new Promise(async (resolve: (value: Semester[]) => void, reject) => {
      const response = await axios.get(
        `https://webd3000functions-apim.azure-api.net/webd3000functions/academicyear/${match.params.id}`
      );

      if (response.status === 200) {
        console.debug(response.data);

        resolve(response.data.semesters);
      } else {
        reject("Unable to access data");
      }
    });
  };

  useEffect(() => {
    (async () => {
      console.log("use effect");
      try {
        const data = await getAcademicYearSemestersData();
        setAcademicYearSemesters(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getAcademicYearSemestersData();
      setAcademicYearSemesters(data);
      event.detail.complete();
    } catch (err) {
      //inform the user that a problem occurred (some kind of alert)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>Semesters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <AcademicYearSemestersList semesters={academicYearSemesters} />
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearSemesters;
