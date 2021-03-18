import { IonList, IonItem } from "@ionic/react";
import "./DiplomaProgramsList.css";
import DiplomaProgrma from "../models/DiplomaProgram";

interface DiplomaProgrmaListProps {
  diplomaprograms: DiplomaProgrma[];
}

const AcademicYearsList: React.FC<DiplomaProgrmaListProps> = ({ diplomaprograms }) => {
  return (
    <IonList>
      {diplomaprograms.map((diplomaprogram, index) => {
        return (
          <IonItem button detail routerLink={`/diplomaprogram/${diplomaprogram.Id}`} key={index}>
            {diplomaprogram.Title}
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default AcademicYearsList;
