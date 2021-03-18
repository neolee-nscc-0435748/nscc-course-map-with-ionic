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
import "./AdvisingAssignments.css";
import AdvisingAssignmentsList from "../components/AdvisingAssignmentsList";
import AdvisingAssignment from "../models/AdvisingAssignment";
import axios from "axios";

interface AdvisingAssignmentsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AdvisingAssignments: React.FC<AdvisingAssignmentsProps> = ({ match }) => {
  const advisingAssignmentsData: AdvisingAssignment[] = [];
  const [advisingAssignments, setAdvisingAssignments]: [
    AdvisingAssignment[],
    (advisingAssignments: AdvisingAssignment[]) => void
  ] = useState(advisingAssignmentsData);

  const getAdvisingAssignmentsData = async () => {
    return new Promise(async (resolve: (value: AdvisingAssignment[]) => void, reject) => {
      const response = await axios.get(
        `https://webd3000functions-apim.azure-api.net/webd3000functions/instructor/${match.params.id}`
      );

      if (response.status === 200) {
        console.debug(response.data);

        resolve(response.data.advisingAssignments);
      } else {
        reject("Unable to access data");
      }
    });
  };

  useEffect(() => {
    (async () => {
      console.log("use effect");
      try {
        const data = await getAdvisingAssignmentsData();
        setAdvisingAssignments(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getAdvisingAssignmentsData();
      setAdvisingAssignments(data);
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
          <IonTitle>Advising Assignments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <AdvisingAssignmentsList advisingAssignments={advisingAssignments} />
      </IonContent>
    </IonPage>
  );
};

export default AdvisingAssignments;
