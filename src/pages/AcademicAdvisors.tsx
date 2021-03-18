import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
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
import "./AcademicAdvisors.css";
import AcademicAdvisorsList from "../components/AcademicAdvisorsList";
import AcademicAdvisor from "../models/AcademicAdvisor";
import axios from "axios";

interface AcademicAdvisorsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AcademicAdvisors: React.FC<AcademicAdvisorsProps> = ({ match }) => {
  const academicAdvisorsData: AcademicAdvisor[] = [];
  const [academicAdvisors, setAcademicAdvisors]: [
    AcademicAdvisor[],
    (academicAdvisors: AcademicAdvisor[]) => void
  ] = useState(academicAdvisorsData);

  const getAcademicAdvisorsData = async () => {
    return new Promise(async (resolve: (value: AcademicAdvisor[]) => void, reject) => {
      const response = await axios.get(
        `https://webd3000functions-apim.azure-api.net/webd3000functions/diplomaprogram/${match.params.id}`
      );

      if (response.status === 200) {
        console.debug(response.data);

        resolve(response.data.advisors);
      } else {
        reject("Unable to access data");
      }
    });
  };

  useEffect(() => {
    (async () => {
      console.log("use effect");
      try {
        const data = await getAcademicAdvisorsData();
        setAcademicAdvisors(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getAcademicAdvisorsData();
      setAcademicAdvisors(data);
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
          <IonTitle>Academic Advisors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <AcademicAdvisorsList academicAdvisors={academicAdvisors} />
      </IonContent>
    </IonPage>
  );
};

export default AcademicAdvisors;
