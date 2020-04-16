
# Getting Started

## Features

* [Redering HTML from JSON](/react-json-page/RenderingHtml)
* [Dynamic Forms](/react-json-page/DynamicForms)
* [Basic Form Validation](/react-json-page/BasicValidation)
* [Async And Custom Form Validation](/react-json-page/CustomValidation)
* [Logical Input Hiddden](/react-json-page/InputHidden)
* [Async Form Post](/react-json-page/AsyncPost)
* [Async Load](/react-json-page/AsyncLoad)
* [Inject External Components and Functions](/react-json-page/InjectedComponents)

## Basic Example

In this exemple, we’ll build a simple form using only JSON.

`index.js`

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducers } from 'react-json-page';
import { combineReducers } from 'redux';

export const ReducersApp = combineReducers({
    dynamicFormState: Reducers
    /*YOUR REDUCERS*/
});
export const Store = createStore(ReducersApp);

ReactDOM.render(
    <Provider store={Store}>
    <App />
    </Provider>, document.getElementById('root'));
```

`App.js`

```jsx
//ADD IMPORT
import {DynamicPage} from 'react-json-page'

//ADD COMPONENT
<DynamicPage form={/*JSON Object*/} />
```

`jsonForm.json`

```json
{
    "id":"mainDiv",
    "type":"div",
    "children":[
    {
        "id":"mainForm",
        "type":"form",
        "className":"form",
        "children":[
            {  
                "id":"titleForm",
                "type":"h1",
                "value":"Formulario",
                "className": "title"
            },
            {  
                "id":"firstName",
                "name":"firstName",
                "type":"text",
                "className": "form-control",
                "value":"Cleverson",
                "validation":{
                    "output":"firstNameError",
                    "validators":[{
                        "type":"required",
                        "msg":"Campo obrigatório."
                    }]
                }
            },
            {
                "id":"firstNameErrorSpan",
                "type":"span",
                "value":"{firstNameError}"
            },
            {
                "type":"br"
            },
            {  
                "id":"lastName",
                "name":"lastName",
                "type":"text",
                "value":"Biora",
                "validation":{
                    "output":"lastNameError",
                    "validators":[{
                        "type":"required",
                        "msg":"Campo obrigatório."
                    }]
                }
            },
            {
                "id":"lastNameErrorSpan",
                "type":"span",
                "value":"{lastNameError}"
            },
            {  
                "id":"btnSubmit",
                "type":"submit",
                "value":"Enviar",
                "className": "btn btn-default"
            }]
    }]
}
```

## Installing

Run the following command:

`npm install react-json-page`


## Built With

* [React](https://reactjs.org/) - The web library used
* [Redux](https://redux.js.org/) - State Management

## Contributing

Coming soon I wiil open for submitting pull requests to us.

## Authors

* **Cleverson Biora** - *Initial work* - [CleversonBiora](https://github.com/cleversonbiora)

See also the list of [contributors](https://github.com/cleversonbiora/react-json-page/contributors) who participated in this project.

## License

This project is licensed under the MIT License.
