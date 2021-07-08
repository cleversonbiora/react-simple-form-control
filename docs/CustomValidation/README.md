# Async And Custom Form Validation

You can use Async and Custom validations in your forms.

## Async Validation

```jsx
this.state = {
        form:{
          email:{
            value:'',
            validation:{
                output:"emailError",
                validators:[{
                    type:"async",
                    message:"Email ja cadastrado.",
                    apiUrl:"http://www.mocky.io/v2/5e988f593500002e00c483c2",
                    method:"GET",
                    headers:{
                            "Content-Type":"application/json",
                            "Authorization": "Bearer xxxxx"
                    },
                    valueField:"success"
                }]
            }
          }
        }
}
```

## Custom Validation

```jsx
this.state = {
        form:{
          firstname:{
                value:''
            }
          },
          lastname:{
            value:'',
            validation:{
                output:"lastnameError",
                validators:[{
                    type:"custom",
                    args:["firstname"],
                    params:["{firstname}"],
                    function:(value,firstname) => {
                        if(value !== firstname)
                          return true;
                        return false;
                    },
                    message:"Last Name must be diffente from First Name"
                }]
            }
          }
        }
}
```