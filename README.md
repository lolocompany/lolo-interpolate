# lolo-interpolate
Library to implement variable interpolation feature of Lolo Code. Common dependency in both lolo-engine and Lolo Code API.
Replaces an interpolation expression in one value with data from another value.

E.g. given
```js
interpolate(
  {"event": { "bar": 42 } },     // data value
  { "foo": "hello {event.bar}" } // interpolated value
)
```
the result would be 
```js
{ "foo": "hello 42" }            // '{event.bar}' replaced with 42
```

