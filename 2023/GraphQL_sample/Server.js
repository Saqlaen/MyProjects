const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql')


const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }

    type Product {
        id: ID!
        description: String!
        reviews: [Review]
        price: Float!
    }

    type Review {
        rating: Int,
        comment: String
    }

    type Order {
        date: String!
        subtotal: Float!
        items: [ OrderItem ]
    }

    type OrderItem {
        product: Product!
        quantity: Int!
    }
`);

const root = {
  products: [
    {
      id: "redshoe",
      description: "RedShoe",
      price: 42.12,
    },
    {
      id: "bluejean",
      description: "Blue Jean",
      price: 32.22,
    },
  ],
  orders: [
    {
      date: "2005-05-05",
      subtotal: 84.24,
      items: [
        {
          product: {
            id: "redshoe",
            description: "RedShoe",
            price: 42.12,
          },
          quantity: 2,
        },
      ],
    },
  ],
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = 3000;
app.listen( PORT, () => {
    console.log('running GraphQLon PORT -> '+ PORT );
} )