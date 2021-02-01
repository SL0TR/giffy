/* eslint-disable  no-template-curly-in-string */

export default function getValidateMessages(
  translator = {},
  inputName = 'label',
) {
  const validateMessages = {
    required: `\${${inputName}} ${translator['is required!']}`,
    types: {
      email: `\${${inputName}} ${translator['is not valid!']}`,
    },
    string: {
      min: `\${${inputName}} ${translator['should be at least']} \${min} ${translator['characters']}`,
      max: `\${${inputName}} ${translator['should be max']} \${min} ${translator['characters']}`,
      range: "'${name}' must be between ${min} and ${max} characters",
    },
  };

  return validateMessages;
}
