import { IonList, IonItem } from "@ionic/react";
import "./InstructorsList.css";
import Instructor from "../models/Instructor";

interface InstructorsListProps {
  instructors: Instructor[];
}

const InstructorsList: React.FC<InstructorsListProps> = ({ instructors }) => {
  return (
    <IonList>
      {instructors.map((instructor, index) => {
        return (
          <IonItem button detail routerLink={`/instructor_courses/${instructor.Id}`} key={index}>
            {`${instructor.LastName}, ${instructor.FirstName}`}
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default InstructorsList;
