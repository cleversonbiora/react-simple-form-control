export function isControlledComponent(type){
    switch(type){
        case 'select':
        case 'datalist':
        case 'textarea':
        case 'input':
            return true;
        default:
            return false;
    }
}
export function isControlledInput(type){
    switch(type){
        case 'checkbox':
        case 'color':
        case 'date':
        case 'datetime-local':
        case 'email':
        case 'file':
        case 'hidden':
        case 'image':
        case 'month':
        case 'number':
        case 'password':
        case 'radio':
        case 'range':
        case 'reset':
        case 'search':
        case 'tel':
        case 'text':
        case 'time':
        case 'url':
        case 'week':
            return true;
        default:
            return false;
    }
}
export function isVoidElement(type){
    switch(type){
    case 'area':
    case 'base':
    case 'br':
    case 'col':
    case 'embed':
    case 'hr':
    case 'img':
    case 'input':
    case 'keygen':
    case 'link':
    case 'menuitem':
    case 'meta':
    case 'param':
    case 'source':
    case 'track':
    case 'wbr':
        return true;
    default:
        return false;
    }
}