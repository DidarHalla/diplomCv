import { useParams } from "react-router-dom";
import { useLanguageProficiencyDialog } from "./language-proficiency.dialog";
import { NewLanguage } from "./new.language";
import { Container } from "@mui/material";
import {
  useProfileLanguageAdd,
  useProfileLanguageUpdate,
  useProfileLanguages,
} from "../../../hooks/use-profile-languages";
import { LanguageCard } from "./language-cards/language.cards";
import { LanguageProficiency } from "cv-graphql";

export const UserLanguages = () => {
  const { userId = "" } = useParams();
  const { languages } = useProfileLanguages(userId);
  const [openLanguageProficiencyDialog] = useLanguageProficiencyDialog();
  const ownLanguages = languages.map((language) => language.name);
  const [addProfileLanguage] = useProfileLanguageAdd();
  const [updateProfileLanguage] = useProfileLanguageUpdate();

  const handleAdd = () => {
    openLanguageProficiencyDialog({
      title: "Add language",
      ownLanguages,
      userId,
      onConfirm({ name, proficiency }) {
        return addProfileLanguage({
          variables: {
            language: {
              userId,
              name,
              proficiency,
            },
          },
        });
      },
    });
  };

  const handleUpdate = (language: LanguageProficiency) => {
    openLanguageProficiencyDialog({
      title: "Update language",
      ownLanguages,
      language,
      userId,
      disableLanguageSelect: true,
      onConfirm({ name, proficiency }) {
        return updateProfileLanguage({
          variables: {
            language: {
              userId,
              name,
              proficiency,
            },
          },
        });
      },
    });
  };

  return (
    <>
      <Container>
        <NewLanguage onClick={handleAdd} />
        <div>
          {languages.map((language) => (
            <LanguageCard
              key={language.name}
              language={language}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </Container>
    </>
  );
};
