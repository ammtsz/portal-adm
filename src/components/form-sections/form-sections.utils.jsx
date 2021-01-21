// CPF Validation
export const cpfValidation = (inputCpf) => {
  let CPF = getOnlyNumbersString(inputCpf);

  let Soma = 0;
  if (CPF === "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);

  let Resto = (Soma * 10) % 11;
  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(CPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(CPF.substring(10, 11))) return false;
  return true;
};



// CPF Formatting
export const formatCpf = (inputNumber) => {
  let cpfNumbers = getOnlyNumbersArray(inputNumber);
  let cpf = limitArrayLength(cpfNumbers, 11);

  //   (xx) x xxxx-xxxx
  if (cpf.length > 3) cpf.splice(3, 0, ".");
  if (cpf.length > 7) cpf.splice(7, 0, ".");
  if (cpf.length > 11) cpf.splice(11, 0, "-");
  if (cpf.length > 15) cpf = cpf.filter((char, idx) => idx < 14);

  let string = "";
  cpf.forEach((char) => (string += char));
  return { target: { name: "cpf", value: string, labels:[""], type: "text" }};
};



// WhatsApp Number Formatting
export const formatPhoneNumber = (inputNumber) => {
  let phoneNumber = getOnlyNumbersArray(inputNumber);

  //   (xx) x xxxx-xxxx
  if (phoneNumber.length >= 1) phoneNumber.splice(0, 0, "(");
  if (phoneNumber.length >= 3) phoneNumber.splice(3, 0, ") ");
  if (phoneNumber.length >= 6) phoneNumber.splice(5, 0, " ");
  if (phoneNumber.length >= 11) phoneNumber.splice(10, 0, "-");

  //   +55 (11) x xxxx-xxxx
  if (phoneNumber.length > 15 && phoneNumber.length <= 18) {
    phoneNumber = getOnlyNumbersArray(inputNumber);
    phoneNumber.splice(0, 0, "+");
    phoneNumber.splice(3, 0, " (");
    phoneNumber.splice(6, 0, ") ");
    phoneNumber.splice(8, 0, " ");
    phoneNumber.splice(13, 0, "-");
  } else if (phoneNumber.length > 18) {
    //   xxxxxxxxxxxxxxxxxxx
    phoneNumber = getOnlyNumbersArray(inputNumber);
  }

  let string = "";
  phoneNumber.forEach((char) => (string += char));
  return { target: { name: "phone", value: string, labels:[""], type: "tel"}};
};



// Get Age -------- CORRIGIR LÓGICA 
export const getAge = (birth) => {
  const today = new Date();

  const birthMiliseconds = Date.parse(birth) + today.getTimezoneOffset();
  const milisecondsDif = Date.parse(today) - birthMiliseconds;
  const yearsDif = Math.floor(Math.floor(milisecondsDif / 1000 / 60 / 60 / 24) / 365.25)

  return { target: { name: "age", value: yearsDif, labels:[""], type: "text" }};
};



// Utils
const getOnlyNumbersString = (string) => {
  let numbers = "";
  [...string]
    .filter((char) => !isNaN(char) && char !== " ")
    .forEach((char) => (numbers += char));
  return numbers;
};

const getOnlyNumbersArray = (string) => {
  return [...string].filter((char) => !isNaN(char) && char !== " ");
};

const limitArrayLength = (array, maxLength) => {
  return array.filter((chars, idx) => idx < maxLength);
};
