import { Translations } from "@/types/translations";

const translations: Translations = {
  Labels: {
    SignUpTitle: "Registrarse 👋",
    SuccessTitle: "Éxito ✅",
    SuccessDescription: "¡Te has registrado con éxito!",
    Order: "Pedido",
    OrderAttached: "se ha añadido a tu cuenta.",
  },
  Inputs: {
    EmailAddress: "Correo electrónico",
    EmailAddressPlaceholder: "Introduce tu correo electrónico",
    EmailAddressErrorMessage: "Introduce un correo electrónico válido",
    EmailAddressUnavailableErrorMessage:
      "Este correo electrónico ya está en uso",
    FirstName: "Nombre",
    FirstNamePlaceholder: "Introduce tu nombre",
    FirstNameErrorMessage: "El nombre es obligatorio",
    LastName: "Apellido",
    LastNamePlaceholder: "Introduce tu apellido",
    LastNameErrorMessage: "El apellido es obligatorio",
    CountryID: "País",
    CountryIDPlaceholder: "Selecciona tu país",
    CountryIDErrorMessage: "Selecciona un país válido",
    DateOfBirth: "Fecha de nacimiento",
    DateOfBirthErrorMessage: "Introduce una fecha de nacimiento válida",
    Gender: "Género",
    GenderMale: "Hombre",
    GenderFemale: "Mujer",
    GenderOther: "Otro",
    GenderErrorMessage: "Selecciona un género",
    LanguageID: "Idioma",
    LanguageIDPlaceholder: "Selecciona tu idioma",
    LanguageIDErrorMessage: "Selecciona un idioma válido",
    PhoneNumber: "Número de teléfono",
    PhoneNumberPlaceholder: "Introduce tu número de teléfono",
    PhoneNumberErrorMessage: "Introduce un número de teléfono válido",
    Password: "Contraseña",
    PasswordPlaceholder: "Introduce tu contraseña",
    PasswordErrorMessage: "La contraseña es obligatoria",
    ConfirmPassword: "Confirmar contraseña",
    ConfirmPasswordPlaceholder: "Confirma tu contraseña",
    ConfirmPasswordErrorMessage: "Las contraseñas no coinciden",
  },
  Actions: {
    SignUp: "Registrarse",
  },
};

export default translations;
