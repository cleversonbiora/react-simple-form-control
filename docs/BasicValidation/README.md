# Basic Validation

The basic validatiors process inputs on your form.

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError", //Output variable to show the error.
        "validators":[/* Yours Input Validations */]
    }
},
{
    "id":"ipputErrorSpan",
    "type":"span",
    "value":"{outputVariableError}" //Using output variable to show the error.
}
```

## required

Validator that requires the iput have a non-empty value.

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"required",
                        "msg":"Required Field."
                    }
        /* Anothers Input Validations */
        ]
}
```

## min

Validator that requires the input's value to be greater than or equal to the provided number.

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"min",
                        "params":[10],
                        "msg":"Less then 10."
                    }
        /* Anothers Input Validations */
        ]
}
```

## max

Validator that requires the input's value to be less than or equal to the provided number.

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"max",
                        "params":[10],
                        "msg":"More then 10."
                    }
        /* Anothers Input Validations */
        ]
}
```

## minLength

Validator that requires the length of the input's value to be greater than or equal to the provided minimum length.

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"minLength",
                        "params":[10],
                        "msg":"To short."
                    }
        /* Anothers Input Validations */
        ]
}
```

## maxLength

Validator that requires the length of the input's value to be less than or equal to the provided maximum length. 

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"maxLength",
                        "params":[10],
                        "msg":"To Long."
                    }
        /* Anothers Input Validations */
        ]
}
```

## email

Validator that requires the input's value pass an email validation test.

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"email",
                        "msg":"Invalid."
                    }
        /* Anothers Input Validations */
        ]
}
```

## pattern

Validator that requires the input's value to match a regex pattern. 

```json
{
    /* Input's Attributes*/
    "validation":{
        "output":"outputVariableError",
        "validators":[{
                        "type":"pattern",
                        "params":["(\\w+)\\s(\\w+)"],
                        "msg":"Invalid."
                    }
        /* Anothers Input Validations */
        ]
}
```