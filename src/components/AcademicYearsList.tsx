import { IonList, IonItem } from "@ionic/react";
import "./AcademicYearsList.css";
import AcademicYear from "../models/AcademicYear";

interface AcademicYearsListProps {
  academicyears: AcademicYear[];
}

const AcademicYearsList: React.FC<AcademicYearsListProps> = ({ academicyears }) => {
  return (
    <IonList>
      {academicyears.map((academicyear, index) => {
        return (
          <IonItem button detail routerLink={`/academicyears/${academicyear.Id}`} key={index}>
            {academicyear.Title}
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default AcademicYearsList;
