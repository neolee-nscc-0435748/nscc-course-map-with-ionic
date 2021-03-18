import { IonList, IonItem } from "@ionic/react";
import "./AcademicYearSemesterCoursesList.css";
import Course from "../models/Course";

interface CoursesTaughtListProps {
  courses: Course[];
}

const CoursesTaughtList: React.FC<CoursesTaughtListProps> = ({ courses }) => {
  return (
    <IonList>
      {courses.length === 0 ? (
        <IonItem>None</IonItem>
      ) : (
        courses.map((course, index) => {
          return (
            <IonItem button detail routerLink={`/course/${course.Id}`} key={index}>
              {`${course.CourseCode} - ${course.Title}`}
            </IonItem>
          );
        })
      )}
    </IonList>
  );
};

export default CoursesTaughtList;
