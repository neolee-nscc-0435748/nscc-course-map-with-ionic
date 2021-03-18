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
import "./InstructorCourses.css";
import InstructorCoursesList from "../components/InstructorCoursesList";
import Course from "../models/Course";
import axios from "axios";

interface InstructorCoursesProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const InstructorCourses: React.FC<InstructorCoursesProps> = ({ match }) => {
  const instructorCoursesData: Course[] = [];
  const [instructorCourses, setInstructorCourses]: [Course[], (instructorCourses: Course[]) => void] = useState(
    instructorCoursesData
  );

  const getInstructorCoursesData = async () => {
    return new Promise(async (resolve: (value: Course[]) => void, reject) => {
      const response = await axios.get(
        `https://webd3000functions-apim.azure-api.net/webd3000functions/instructor/${match.params.id}`
      );

      if (response.status === 200) {
        console.debug(response.data);

        resolve(response.data.courses);
      } else {
        reject("Unable to access data");
      }
    });
  };

  useEffect(() => {
    (async () => {
      console.log("use effect");
      try {
        const data = await getInstructorCoursesData();
        setInstructorCourses(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getInstructorCoursesData();
      setInstructorCourses(data);
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
          <IonTitle>Instructor's Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <InstructorCoursesList instructorCourses={instructorCourses} />
      </IonContent>
    </IonPage>
  );
};

export default InstructorCourses;
