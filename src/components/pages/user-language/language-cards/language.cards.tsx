import { Typography } from "@mui/material";
import { MouseEvent } from "react";
import * as Styled from "./language.card.styles";
import { LanguageProficiency } from "cv-graphql";
import { useReactiveVar } from "@apollo/client";
import {
  entityNameVar,
  setEntityName,
} from "../../../features/isEntity/isEntity";

type LanguageCardProps = {
  language: LanguageProficiency;
  onUpdate(language: LanguageProficiency): void;
};

export const LanguageCard = ({ language, onUpdate }: LanguageCardProps) => {
  const entityNameLanguage = useReactiveVar(entityNameVar);
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setEntityName(language.name);
  };

  const onClickCard = () => {
    if (entityNameLanguage.length) {
      setEntityName(language.name);
      return;
    }

    onUpdate(language);
  };

  return (
    <Styled.Card
      color="secondary"
      onContextMenu={handleContextMenu}
      onClick={onClickCard}
    >
      <Typography>{language.proficiency}</Typography>
      <Typography>{language.name}</Typography>
    </Styled.Card>
  );
};
