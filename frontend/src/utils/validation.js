export const validateForm = (body, config = []) => {
  const newErrors = {};

  if (!Array.isArray(config)) return newErrors;

  config.forEach((field) => {
    if (
      field.required &&
      (!body[field.name] || body[field.name].toString().trim() === "")
    ) {
      newErrors[field.name] = "This field is required";
    }
  });

  return newErrors;
};
