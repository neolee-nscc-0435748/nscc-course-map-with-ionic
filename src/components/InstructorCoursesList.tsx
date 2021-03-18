import { IonList, IonItem } from "@ionic/react";
import "./InstructorCoursesList.css";
import Course from "../models/Course";

interface InstructorCoursesListProps {
  instructorCourses: Course[];
}

const InstructorCoursesList: React.FC<InstructorCoursesListProps> = ({ instructorCourses }) => {
  return (
    <IonList>
      {instructorCourses.length === 0 ? (
        <IonItem>None</IonItem>
      ) : (
        instructorCourses.map((course, index) => {
          return (
            <IonItem
              button
              detail
              routerLink={`/course/${course.Id}`}
              key={index}
            >{`${course.CourseCode} - ${course.Title}`}</IonItem>
          );
        })
      )}
    </IonList>
  );
};

export default InstructorCoursesList;
