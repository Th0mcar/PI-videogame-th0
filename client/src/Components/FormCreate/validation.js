const validation = (input) => {
  const regexName = /^[a-zA-Z0-9\s]+$/;

  // Valida que la descripción no esté vacía
  if (input.description === "") return "Description is required";

  // Valida que haya una URL
  if (input.background_image === "") return "URL is required";

  // Valida que la fecha de lanzamiento no esté vacía
  if (input.released === "") return "Released is required";

  // Valida que el rating esté entre 0 y 5
  if (input.rating < 0 || input.rating > 5)
    return "The rating must be between 0 and 5";

  // Valida las plataformas o géneros
  if (input.platform || input.genre) {
    if (input.platform) {
      // Verifica que haya por lo menos una plataforma seleccionada
      if (input.platform.length === 0) return "At least one platform";
    } else {
      // Verifica que haya por lo menos un género seleccionado
      if (input.genre.length === 0) return "At least one genre";
    }
  }

  // Valida que el nombre no esté vacío
  if (input.name === "") return "Name is required";

  // Valida que el nombre solo pueda tener letras y números
  if (!regexName.test(input.name)) return "Only letters and numbers";

  // Si no hay errores, devuelve una cadena vacía
  return "";
};

export default validation;
