import React from "react";
import { strings } from "../config/strings";
import { capitalize } from "../utils/strings";

interface Props {
  onChange: Function;
  defaultValue: string;
}

export default function LanguageDropdown({ onChange, defaultValue }: Props) {
  return (
    <select id="language-dropdown" defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)}>
      {
        Object.values(strings).map(val => {
          const languageFull = val['_LANGUAGE'];
          const languageISO = val['_ISO'];
          return (<option
                    key={languageISO}
                    value={languageISO}>
                      {capitalize(languageFull)}
                  </option>
                )
        })
      }
    </select>
  )
}