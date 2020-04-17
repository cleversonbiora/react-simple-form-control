# More

More features.

## utils functions

```jsx
import { mapValues, getFormValues,isFormValid, isStepValid } from 'react-simple-form-control'
```

## mapValues

You can auto maps your object to the form

```jsx
  let user = {
    firstname:'Jonh',
    lastname:'Chosen',
    email:'jonh@chosen.com'
  }

  let formNew = mapValues(form, user); //auto map values to form
  let valid = isFormValid(formNew);
  this.setState({ form: formNew, valid });
```

## getFormValues

You can auto maps your object from form

```jsx
  const{form} = this.state;
  let values = getFormValues(form); //auto map values from form
```

## isFormValid

You can check the form

```jsx
  const{form} = this.state;
  let valid = isFormValid(form);
```

## isStepValid

You can check part of form

### form attribute

```jsx
this.state = {
        form:{
          phone:{
            value:'',
            mask:cellphoneBR
          }
        }
}
```

```jsx
    let valid = isStepValid(form,'step1')); //validate by step atribute
```

### form fields array

```jsx
    let valid = isStepValid(form,['firstname', 'age']); //validate by array fields
```

## Ref and DOM

Refs provide a way to access DOM nodes in the form.

```jsx
    const{form} = this.state;
    console.log(form.email.ref.current);
```

### set focus

```jsx
    const{form} = this.state;
    form.email.ref.current.focus(); //Set focus
```

### scroll to error

```jsx
  _onSubmit = async (values,valid) => {
    if (valid[0]) {
        console.log(values,valid);
    }else{
      const{form} = this.state;
      window.scrollTo(0, form[valid[1][0].field].ref.current.offsetTop); //Scroll to first error field
    }
  }
```