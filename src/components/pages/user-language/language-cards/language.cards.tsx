import { Typography } from "@mui/material";
import * as Styled from "./language.card.styles";
import { LanguageProficiency } from "cv-graphql";
import { useReactiveVar } from "@apollo/client";
import { setEntityName } from "../../../features/isEntity/isEntityName";

type LanguageCardProps = {
  language: LanguageProficiency;
  onUpdate(language: LanguageProficiency): void;
};

export const LanguageCard = ({ language, onUpdate }: LanguageCardProps) => {
  const onClickCard = () => {
    setEntityName(language.name);
    onUpdate(language);
  };

  return (
    <Styled.Card color="secondary" onClick={onClickCard}>
      <Typography>{language.proficiency}</Typography>
      <Typography>{language.name}</Typography>
    </Styled.Card>
  );
};
