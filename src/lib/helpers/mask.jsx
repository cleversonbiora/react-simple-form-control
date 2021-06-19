export function cpf(value) {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export function telUsa(value) {
  return `${value
    .replace('+1', '')
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '+1($1) $2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')}`
}

export const cellphoneBR = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export const maskFormat = (value, mask) => {
  let chars = ['*', '9', 'a'];
  let formatedValue = '';
  let j = 0;
  let scape = false;
  for (let i = 0; i < mask.length; i++) {
    if (j < value.length) {
      if (mask[i] === '\\') {
        scape = true;
        continue;
      }
      if (chars.indexOf(mask[i]) === -1 || scape) {
        formatedValue += mask[i];
      } else {
        switch (mask[i]) {
          case '9':
            let number = value[j].replace(/\D/g, '');
            if (number)
              formatedValue += number;
            else
              i--;
            break;
          case 'a':
            let char = value[j].replace(/[^a-zA-Z]+/g, '');
            if (char)
              formatedValue += char;
            else
              i--;
            break;
          default:
            formatedValue += value[j];
            break;
        }
        j++;
      }
    } else {
      break;
    }
    scape = false;
  }
  return formatedValue;
}