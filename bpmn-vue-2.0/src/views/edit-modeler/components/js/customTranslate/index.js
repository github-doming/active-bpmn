// import language from "./zh_cn";
import language from './language'

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate
  template = language[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    let str = replacements[key];
    if(language[replacements[key]] != null && language [replacements[key]] !== 'undefined'){
      str = language[replacements[key]];
    }
    return  str || '{' + key + '}';
  });
}
