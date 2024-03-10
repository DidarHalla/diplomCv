import { useMutation, useQuery } from '@apollo/client'
import { CreateLanguageInput, UpdateLanguageInput } from 'cv-graphql'
import { CREATE_LANGUAGE, LANGUAGES, UPDATE_LANGUAGE } from '../graphql/user.language/user.language'
import { CreateLanguageResult, LanguagesResult, UpdateLanguageResult } from '../graphql/language/languages.types'

export const useLanguages = () => {
  const query = useQuery<LanguagesResult>(LANGUAGES)
  return { languages: query.data?.languages || [], ...query }
}


export const useLanguageCreate = () => {
  return useMutation<CreateLanguageResult, { language: CreateLanguageInput }>(CREATE_LANGUAGE, {
    refetchQueries: [LANGUAGES]
  })
}

export const useLanguageUpdate = () => {
  return useMutation<UpdateLanguageResult, { language: UpdateLanguageInput }>(UPDATE_LANGUAGE)
}
