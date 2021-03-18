import { IonList, IonItem } from "@ionic/react";
import "./CoursesList.css";
import Course from "../models/Course";

interface CoursesListProps {
  courses: Course[];
  searchText: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, searchText }) => {
  const searchResult = courses.filter((course) => {
    return course.Title.toLowerCase().includes(searchText.toLowerCase());
  });

  if (searchResult.length === 0) {
    return (
      <IonList>
        <IonItem>No courses found</IonItem>
      </IonList>
    );
  } else {
    return (
      <IonList>
        {searchResult.map((course, index) => {
          return (
            <IonItem button detail routerLink={`/course/${course.Id}`} key={index}>
              {course.Title}
            </IonItem>
          );
        })}
      </IonList>
    );
  }
};

export default CoursesList;
