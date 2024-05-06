import { useParams } from "react-router-dom";
import { useLanguageProficiencyDialog } from "./language-proficiency.dialog";
import { NewLanguage } from "./new.language";
import { Container } from "@mui/material";
import {
  useProfileLanguageAdd,
  useProfileLanguageDelete,
  useProfileLanguageUpdate,
  useProfileLanguages,
} from "../../../hooks/use-profile-languages";
import { LanguageCard } from "./language-cards/language.cards";
import { DeletedProfileLanguage } from "./deleted.profile.language";
import { LanguageProficiency } from "cv-graphql";

export const UserLanguages = () => {
  const { userId = "" } = useParams();
  const { languages } = useProfileLanguages(userId);
  const [openLanguageProficiencyDialog] = useLanguageProficiencyDialog();
  const ownLanguages = languages.map((language) => language.name);
  const [addProfileLanguage] = useProfileLanguageAdd();
  const [deleteProfileLanguage] = useProfileLanguageDelete();
  const [updateProfileLanguage] = useProfileLanguageUpdate();

  const handleAdd = () => {
    openLanguageProficiencyDialog({
      title: "Add language",
      ownLanguages,
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

  const handleDelete = (entityNameLanguages: string[]) => {
    return deleteProfileLanguage({
      variables: {
        language: {
          userId,
          name: entityNameLanguages,
        },
      },
    });
  };

  const handleUpdate = (language: LanguageProficiency) => {
    openLanguageProficiencyDialog({
      title: 'Update language',
      ownLanguages,
      language,
      disableLanguageSelect: true,
      onConfirm({ name, proficiency }) {
        return updateProfileLanguage({
          variables: {
            language: {
              userId,
              name,
              proficiency
            }
          }
        })
      }
    })
  }

  return (
    <>
      <Container>
        <DeletedProfileLanguage onDelete={handleDelete}>
          <NewLanguage onClick={handleAdd} />
          <div>
            {languages.map((language) => (
              <LanguageCard key={language.name} language={language} onUpdate={handleUpdate}/>
            ))}
          </div>
        </DeletedProfileLanguage>
      </Container>
    </>
  );
};
