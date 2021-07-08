# Basic Validation

The basic validatiors process inputs on your form.


## required

Validator that requires the iput have a non-empty value.

```jsx
this.state = {
        form:{
          firstname:{
            value:'',
            validation:{
                output:"firstnameError",
                validators:[{
                    type:"required",
                    message:"Required Field."
                }]
            }
          }
        }
}
```

## min

Validator that requires the input's value to be greater than or equal to the provided number.

```jsx
this.state = {
        form:{
            age:{
                value:'20',
                validation:{
                    output:"ageError",
                    validators:[{
                        type:"min",
                        params:[18],
                        message:"Min Age 18."
                    }]
                }
            }
        }
}
```

## max

Validator that requires the input's value to be less than or equal to the provided number.

```jsx
this.state = {
        form:{
            age:{
                value:'20',
                validation:{
                    output:"ageError",
                    validators:[{
                        type:"max",
                        params:[60],
                        message:"Max Age 60."
                    }]
                }
            }
        }
}
```

## minLength

Validator that requires the length of the input's value to be greater than or equal to the provided minimum length.

```jsx
this.state = {
        form:{
          firstname:{
            value:'',
            validation:{
                output:"firstnameError",
                validators:[{
                    type:"minLength",
                    params:[5],
                    message:"Min Length 5."
                }]
            }
          }
        }
}
```

## maxLength

Validator that requires the length of the input's value to be less than or equal to the provided maximum length. 

```jsx
this.state = {
        form:{
          firstname:{
            value:'',
            validation:{
                output:"firstnameError",
                validators:[{
                    type:"maxLength",
                    params:[15],
                    message:"Max Length 15."
                }]
            }
          }
        }
}
```

## email

Validator that requires the input's value pass an email validation test.

```jsx
this.state = {
        form:{
          email:{
            value:'',
            validation:{
                output:"emailError",
                validators:[{
                    type:"email",
                    message:"Invalid Email."
                }]
            }
          }
        }
}
```

## pattern

Validator that requires the input's value to match a regex pattern. 

```jsx
this.state = {
        form:{
          cpf:{
            value:'',
            validation:{
                output:"cpfError",
                validators:[{
                    type:"pattern",
                    params:['\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}'],
                    message:"Invalid CPF."
                }]
            }
          }
        }
}
```