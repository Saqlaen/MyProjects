# NOTES

`express-graphql` has been deprecated 

so in order to learn i have used the compatible version of graphql `^15.3.0` for `express-graphql`

## GraphQL

1. to define a type

## we have a tool that we can use to test our grahql query in our local

the configuration you need 

```javascript
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // add this to enable it
  })
);
```

## GraphQL REQ &  RES

request body

```json
{
    "query": "{ description }"
}
```

response 

```json
{
    "data": {
        "description": "red shoe"
    }
}
```

```
----------------
REQUEST
----------------

{
	products {
	  id,
    description,
    price
	}
}
----------------
RESPONSE
----------------
{
  "data": {
    "products": [
      {
        "id": "redshoe",
        "description": "RedShoe",
        "price": 42.12
      },
      {
        "id": "bluejean",
        "description": "Blue Jean",
        "price": 32.22
      }
    ]
  }
}
```

```
----------------
REQUEST
----------------
{
	orders {
	  date,
    subtotal,
    items {
      product{
        id
      }
      quantity
    }
	}
}
----------------
RESPONSE
----------------
{
  "data": {
    "orders": [
      {
        "date": "2005-05-05",
        "subtotal": 84.24,
        "items": [
          {
            "product": {
              "id": "redshoe"
            },
            "quantity": 2
          }
        ]
      }
    ]
  }
}
```