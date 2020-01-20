export function mapValues(form,values){
    for (const element of Object.entries(form)) {
      if(values[element[0]]){
        element[1].value = values[element[0]];
      }
    }
    return form;
}