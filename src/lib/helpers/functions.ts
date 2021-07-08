export function mapValues(form: any, values: any) {
  for (const element of Object.entries(form)) {
    if (values[element[0]]) {
      const el = element[1] as any;
      el.value = values[element[0]];
    }
  }
  return form;
}