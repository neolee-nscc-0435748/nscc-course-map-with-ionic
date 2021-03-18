import { IonTitle, IonList, IonItem } from "@ionic/react";
import "./CourseDetailsList.css";
import CourseDetail from "../models/CourseDetail";

interface CoursesDetailListProps {
  courseDetail: CourseDetail;
}

const CoursesDetailList: React.FC<CoursesDetailListProps> = ({ courseDetail }) => {
  return (
    <>
      <IonItem></IonItem>
      <IonTitle size="large" color="primary">
        Title
      </IonTitle>
      <IonItem>{courseDetail.Title}</IonItem>

      <IonTitle size="large" color="primary">
        Course Code
      </IonTitle>
      <IonItem>{courseDetail.CourseCode}</IonItem>

      <IonTitle size="large" color="primary">
        Prerequsite Courses
      </IonTitle>
      <IonList>
        {courseDetail.prerequisiteCourses.length === 0 ? (
          <IonItem key="0">{"None"}</IonItem>
        ) : (
          courseDetail.prerequisiteCourses.map((course, index) => {
            return <IonItem key={index}>{`${course.CourseCode} - ${course.Title}`}</IonItem>;
          })
        )}
      </IonList>

      <IonTitle size="large" color="primary">
        Prerequsite For
      </IonTitle>
      <IonList>
        {courseDetail.prerequisitesFor.length === 0 ? (
          <IonItem key="0">{"None"}</IonItem>
        ) : (
          courseDetail.prerequisitesFor.map((course, index) => {
            return <IonItem key={index}>{`${course.CourseCode} - ${course.Title}`}</IonItem>;
          })
        )}
      </IonList>
    </>
  );
};

export default CoursesDetailList;
