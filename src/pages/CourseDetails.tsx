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
import "./CourseDetails.css";
import CourseDetailsList from "../components/CourseDetailsList";
import CourseDetail from "../models/CourseDetail";
import axios from "axios";

interface CourseDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const CourseDetails: React.FC<CourseDetailsProps> = ({ match }) => {
  const courseDetailData: CourseDetail = {
    Id: 0,
    CourseCode: "",
    Title: "",
    prerequisiteCourses: [],
    prerequisitesFor: [],
  };
  const [courseDetail, setCourseDetail]: [CourseDetail, (courseDetailData: CourseDetail) => void] = useState(
    courseDetailData
  );

  const getCourseDetailsData = async () => {
    return new Promise(async (resolve: (value: CourseDetail) => void, reject) => {
      const response = await axios.get(
        `https://webd3000functions-apim.azure-api.net/webd3000functions/course/${match.params.id}`
      );

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
        const data = await getCourseDetailsData();
        setCourseDetail(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getCourseDetailsData();
      setCourseDetail(data);
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
          <IonTitle>Course Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonToolbar>
          <CourseDetailsList courseDetail={courseDetail} />
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default CourseDetails;
