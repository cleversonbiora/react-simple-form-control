# Mask

The mask formating on your inputs.


## patern mask

```jsx
this.state = {
        form:{
          phone:{
            value:'',
            mask:'(999) 999-9999'
          }
        }
}
```

## default mask

```jsx
this.state = {
        form:{
          phone:{
            value:'',
            mask:'telUsa'
          }
        }
}
```

## custom mask


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

Custom function intecept and format the value.

```jsx
cellphoneBR = value => {
  return value
      .replace(/\D/g, '') 
      .replace(/(\d{2})(\d)/, '($1) $2') 
      .replace(/(\d{5})(\d)/, '$1-$2')
}
```