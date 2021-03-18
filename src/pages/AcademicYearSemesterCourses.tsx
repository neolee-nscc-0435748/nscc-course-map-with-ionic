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
import "./AcademicYearSemesterCourses.css";
import AcademicYearSemesterCoursesList from "../components/AcademicYearSemesterCoursesList";
import CourseTaught from "../models/Course";
import axios from "axios";

interface AcademicYearSemesterCoursesProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AcademicYearSemesterCourses: React.FC<AcademicYearSemesterCoursesProps> = ({ match }) => {
  const academicYearSemesterCoursesData: CourseTaught[] = [];
  const [academicYearSemesterCourses, setAcademicYearSemesterCourses]: [
    CourseTaught[],
    (academicYearSemesters: CourseTaught[]) => void
  ] = useState(academicYearSemesterCoursesData);

  const getAcademicYearSemestersData = async () => {
    return new Promise(async (resolve: (value: CourseTaught[]) => void, reject) => {
      const response = await axios.get(
        `https://webd3000functions-apim.azure-api.net/webd3000functions/semester_courses/${match.params.id}`
      );

      if (response.status === 200) {
        console.debug(response.data);

        resolve(response.data.coursesTaught);
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
        setAcademicYearSemesterCourses(data);
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
      setAcademicYearSemesterCourses(data);
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
          <IonTitle>Courses Taught</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <AcademicYearSemesterCoursesList courses={academicYearSemesterCourses} />
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearSemesterCourses;
