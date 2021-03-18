import { IonList, IonItem } from "@ionic/react";
import "./AcademicYearSemestersList.css";
import Semester from "../models/Semester";

interface SemestersListProps {
  semesters: Semester[];
}

const SemestersList: React.FC<SemestersListProps> = ({ semesters }) => {
  return (
    <IonList>
      {semesters.map((semester, index) => {
        return (
          <IonItem button detail routerLink={`/semester_courses/${semester.Id}`} key={index}>
            {semester.Name}
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default SemestersList;
