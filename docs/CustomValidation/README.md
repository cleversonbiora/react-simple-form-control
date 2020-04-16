# Async And Custom Form Validation

You can use Async and Custom validations in your forms.

## Async Validation

```json
{  
    /*Any tag attribute*/
    "validation":{
        "output":"emailError",
        "validators":[{
            "type":"async",
            "msg":"Email already used.",
            "apiUrl":"https://ypur.api/hasEmail?email={email}",
            "method":"GET",
            "valueField":"success"
        }]
    }
}
```

## Custom Validation

```json
{  
    /*Any tag attribute*/
    "validation":{
        "output":"firstNameError",
        "validators":[{
            "type":"custom",
            "args":["lastName"],
            "params":["{lastName}"],
            "body":"return lastName !== value",
            "msg":"First Name equals Last Name"
        }]
    }
}
```