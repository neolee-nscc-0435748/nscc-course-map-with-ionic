import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./Courses.css";
import CoursesList from "../components/CoursesList";
import Course from "../models/Course";
import axios from "axios";

const Courses: React.FC = () => {
  const coursesData: Course[] = [];
  const [courses, setCourses]: [Course[], (courses: Course[]) => void] = useState(coursesData);
  // for search bar
  const [searchText, setSearchText] = useState("");

  const getCoursesData = async () => {
    return new Promise(async (resolve: (value: Course[]) => void, reject) => {
      const response = await axios.get("https://webd3000functions-apim.azure-api.net/webd3000functions/courses");

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
        const data = await getCoursesData();
        setCourses(data);
      } catch (err) {
        //inform the user that a problem occurred (some kind of alert)
      }
    })();
  }, []);

  const doRefresh: (event: CustomEvent<RefresherEventDetail>) => void = async (event) => {
    console.log("do refresh");

    //stop the spinner
    try {
      const data = await getCoursesData();
      setCourses(data);
      event.detail.complete();
    } catch (err) {
      //inform the user that a problem occurred (some kind of alert)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)} />
        <CoursesList courses={courses} searchText={searchText} />
      </IonContent>
    </IonPage>
  );
};

export default Courses;
