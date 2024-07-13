<h1 align="center" style="font-weight: bold;">Online Store 🛒</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>Backend of my first Online Store written on NestJS, PostgreSQL, Prisma ORM.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

<h2 id="started">🚀 Getting started</h2>

Clone repo to your desktop, don't forget to install all dependencies and open project in some code editor or IDE

<h3>Prerequisites</h3>

Here are list of all prerequisites necessary for running this project:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

<h3>Cloning</h3>

How to clone this project

```bash
git clone https://github.com/DenysJSE/OnlineStoreBackend.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your AWS Credentials

```yaml
PORT=7777
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
JWT_SECRET="SOMEsecretKEY"
```

<h3>Starting</h3>

How to start your project

```bash
cd OnlineStoreBackend
npm run start:dev
```

<h2 id="routes">📍 API Endpoints</h2>

Here are all endpoints for this backend (the structure of full address is - "http://localhost:7777/api/${request}".

<table>
  <tr>
    <th>Route</th>
    <th>Description</th>
  </tr>

  <tr>
    <th colspan="2" align="center">Auth Endpoints</th>
  </tr>
  <tr>
    <td><kbd>POST /auth/register</kbd></td>
    <td>Endpoint for <a href="#register-user">register user</a></td>
  </tr>
  <tr>
    <td><kbd>POST /auth/login</kbd></td>
    <td>Endpoint for <a href="#login-user">login user</a></td>
  </tr>
  <tr>
    <td><kbd>POST /auth/login/access-token</kbd></td>
    <td>Endpoint for <a href="#get-access-token">get access token</a></td>
  </tr>

  <tr>
    <th colspan="2" align="center">Users Endpoints</th>
  </tr>
  <tr>
    <td><kbd>GET /users/profile</kbd></td>
    <td>Endpoint for <a href="#get-user-profile">get user profile</a></td>
  </tr>
  <tr>
    <td><kbd>GET /users/profile</kbd></td>
    <td>Endpoint for <a href="#update-user-profile">update user profile</a></td>
  </tr>
  <tr>
    <td><kbd>PUT /users/profile/favorites/:productId</kbd></td>
    <td>Endpoint for <a href="#add-or-remove-product-in-favorite">add or remove product in favorite</a></td>
  </tr>

  <tr>
    <th colspan="2" align="center">Category Endpoints</th>
  </tr>
  <tr>
    <td><kbd>GET /categories</kbd></td>
    <td>Endpoint for <a href="#get-all-categories">get all categories</a></td>
  </tr>
  <tr>
    <td><kbd>GET /categories/by-slug/watches</kbd></td>
    <td>Endpoint for <a href="#get-category-by-slug">get category by slug</a></td>
  </tr>
  <tr>
    <td><kbd>GET /categories/:categoryId</kbd></td>
    <td>Endpoint for <a href="#get-category-by-id">get category by id</a></td>
  </tr>
  <tr>
    <td><kbd>POST /categories</kbd></td>
    <td>Endpoint for <a href="#create-category">create category</a></td>
  </tr>
  <tr>
    <td><kbd>PUT /categories/:categoryId</kbd></td>
    <td>Endpoint for <a href="#update-category">update category</a></td>
  </tr>
  <tr>
    <td><kbd>DELETE /categories/:categoryId</kbd></td>
    <td>Endpoint for <a href="#delete-category">delete category</a></td>
  </tr>

  <tr>
    <th colspan="2" align="center">Product Endpoints</th>
  </tr>
  <tr>
    <td><kbd>GET /products</kbd></td>
    <td>Endpoint for <a href="#get-all-products">get all products</a></td>
  </tr>
  <tr>
    <td><kbd>GET /products/by-slug/:slug</kbd></td>
    <td>Endpoint for <a href="#get-product-by-slug">get product by slug</a></td>
  </tr>
  <tr>
    <td><kbd>GET /products/:productId</kbd></td>
    <td>Endpoint for <a href="#get-product-by-id">get product by id</a></td>
  </tr>
  <tr>
    <td><kbd>GET /products/by-category/:category</kbd></td>
    <td>Endpoint for <a href="#get-product-by-category">get product by category</a></td>
  </tr>
  <tr>
    <td><kbd>GET /products/similar/:productId</kbd></td>
    <td>Endpoint for <a href="#get-similar-product">get similar product</a></td>
  </tr>
  <tr>
    <td><kbd>POST /products</kbd></td>
    <td>Endpoint for <a href="#create-product">create product</a></td>
  </tr>
  <tr>
    <td><kbd>PUT /products/:productId</kbd></td>
    <td>Endpoint for <a href="#update-product">update product</a></td>
  </tr>
  <tr>
    <td><kbd>DELETE /products/:productId</kbd></td>
    <td>Endpoint for <a href="#delete-product">delete product</a></td>
  </tr>

  <tr>
    <th colspan="2" align="center">Orders Endpoints</th>
  </tr>
  <tr>
    <td><kbd>GET /orders</kbd></td>
    <td>Endpoint for <a href="#get-all-orders">get all orders</a></td>
  </tr>

  <tr>
    <th colspan="2" align="center">Reviews Endpoints</th>
  </tr>
  <tr>
    <td><kbd>GET /reviews</kbd></td>
    <td>Endpoint for <a href="#get-all-reviews">get all reviews</a></td>
  </tr>
  <tr>
    <td><kbd>GET /reviews/leave/:reviewId</kbd></td>
    <td>Endpoint for <a href="#leave-review">leave review</a></td>
  </tr>

  <tr>
    <th colspan="2" align="center">Statistic Endpoints</th>
  </tr>
  <tr>
    <td><kbd>GET /statistics/main</kbd></td>
    <td>Endpoint for <a href="#get-all-statistic">get all statistic</a></td>
  </tr>
</table>


<h1>Auth Endpoints</h1>
<h3 id="register-user">POST /auth/register</h3>

**REQUEST**

```json
{
  "email": "denys@test.com",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "user": {
    "id": 1,
    "email": "denys@test.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzIwODYxMDgyLCJleHAiOjE3MjA4NjQ2ODJ9.1tiu0vQ7RYqLmMhFyeLM5mIFfSrcFL4x4FA5Mi05JwE",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzIwODYxMDgyLCJleHAiOjE3MjE0NjU4ODJ9.fPnKQQ_z1_XtpGOPPhp-Ffj5MOntFDvCPj53CI5U7Ck"
}
```

<h3 id="login-user">POST /auth/login</h3>

**REQUEST**

```json
{
  "email": "denys@test.com",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "user": {
    "id": 1,
    "email": "denys@test.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzIwODYxMDgyLCJleHAiOjE3MjA4NjQ2ODJ9.1tiu0vQ7RYqLmMhFyeLM5mIFfSrcFL4x4FA5Mi05JwE",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzIwODYxMDgyLCJleHAiOjE3MjE0NjU4ODJ9.fPnKQQ_z1_XtpGOPPhp-Ffj5MOntFDvCPj53CI5U7Ck"
}
```

<h3 id="get-access-token">POST /auth/login/access-token</h3>

**REQUEST**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwODU2OTYyLCJleHAiOjE3MjE0NjE3NjJ9.vtClqZAV7UBmXPgUnDdrWIje6a3R9Ggtq-dq67qcPGc"
}
```

**RESPONSE**

```json
{
  "user": {
    "id": 1,
    "email": "denys@test.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzIwODYxMDgyLCJleHAiOjE3MjA4NjQ2ODJ9.1tiu0vQ7RYqLmMhFyeLM5mIFfSrcFL4x4FA5Mi05JwE",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzIwODYxMDgyLCJleHAiOjE3MjE0NjU4ODJ9.fPnKQQ_z1_XtpGOPPhp-Ffj5MOntFDvCPj53CI5U7Ck"
}
```

<h1>User Endpoints</h1>
<h3 id="get-user-profile">GET /users/profile</h3>

**RESPONSE**

```json
{
  "id": 4,
  "email": "denys@test.com",
  "name": "Mazie",
  "avatarPath": "https://avatars.githubusercontent.com/u/27553497",
  "phone": "+38(092) 053 7987",
  "favorites": [
    {
      "id": 30,
      "name": "Handcrafted Plastic Computer",
      "price": 324,
      "images": [
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500"
      ],
      "slug": "handcrafted-plastic-computer"
    }
  ]
}
```

<h3 id="update-user-profile">PUT /users/profile</h3>

**REQUEST**

```json
{
  "email": "denys@test.com",
  "phone": "+38(092) 053 7987"
}
```

**RESPONSE**

```json
{
  "id": 4,
  "createdAt": "2024-07-13T08:58:02.207Z",
  "updatedAt": "2024-07-13T16:23:47.145Z",
  "email": "denys@test.com",
  "name": "Mazie",
  "avatarPath": "https://avatars.githubusercontent.com/u/27553497",
  "phone": "+38(092) 053 7987"
}
```

<h3 id="add-or-remove-product-in-favorite">POST /users/profile/favorites/:productId</h3>


**RESPONSE**

```json
{
  "message": "Success!"
}
```

<h1>Category Endpoints</h1>
<h3 id="get-all-categories">GET /categories</h3>

**RESPONSE**

```json
[
  {
    "id": 14,
    "name": "Shoes",
    "slug": "shoes"
  },
  {
    "id": 15,
    "name": "Clothing",
    "slug": "clothing"
  },
  {
    "id": 17,
    "name": "Home",
    "slug": "home"
  }
]
```

<h3 id="get-category-by-slug">GET /categories/by-slug/watches</h3>

**RESPONSE**

```json
{
  "id": 37,
  "name": "Watches",
  "slug": "watches"
}
```

<h3 id="get-category-by-id">GET /categories/:categoryId</h3>

**RESPONSE**

```json
{
  "id": 40,
  "name": "Books",
  "slug": "books"
}
```

<h3 id="create-category">POST /categories</h3>

**RESPONSE**

```json
{
  "id": 38,
  "createdAt": "2024-07-13T12:58:49.525Z",
  "updatedAt": "2024-07-13T12:58:49.525Z",
  "name": "",
  "slug": ""
}
```

<h3 id="update-category">UPDATE /categories/:categoryId</h3>

**REQUEST**

```json
{
  "name": "Watches"
}
```

**RESPONSE**

```json
{
  "id": 37,
  "createdAt": "2024-07-13T12:57:14.836Z",
  "updatedAt": "2024-07-13T12:58:09.951Z",
  "name": "Watches",
  "slug": "watches"
}
```

<h3 id="delete-category">DELETE /categories/:categoryId</h3>

**RESPONSE**

```json
{
  "id": 37,
  "createdAt": "2024-07-13T12:57:14.836Z",
  "updatedAt": "2024-07-13T12:58:09.951Z",
  "name": "Watches",
  "slug": "watches"
}
```

<h1>Products Endpoints</h1>
<h3 id="get-all-products">GET /products</h3>

**RESPONSE**

```json
{
  "products": [
    {
      "id": 40,
      "createdAt": "2024-07-13T13:07:46.950Z",
      "updatedAt": "2024-07-13T13:07:46.950Z",
      "name": "Luxurious Cotton Gloves",
      "slug": "luxurious-cotton-gloves",
      "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      "price": 361,
      "images": [
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500"
      ],
      "categoryId": 56,
      "userId": null
    },
    {
      "id": 39,
      "createdAt": "2024-07-13T13:07:46.946Z",
      "updatedAt": "2024-07-13T13:07:46.946Z",
      "name": "Ergonomic Concrete Gloves",
      "slug": "ergonomic-concrete-gloves",
      "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      "price": 433,
      "images": [
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500",
        "https://loremflickr.com/500/500"
      ],
      "categoryId": 55,
      "userId": null
    }
  ]
}
```

<h3 id="get-product-by-slug">GET /products/by-slug/handcrafted-plastic-computer</h3>

**RESPONSE**

```json
{
  "id": 30,
  "name": "Handcrafted Plastic Computer",
  "slug": "handcrafted-plastic-computer",
  "price": 324,
  "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
  "images": [
    "https://loremflickr.com/500/500",
    "https://loremflickr.com/500/500",
    "https://loremflickr.com/500/500",
    "https://loremflickr.com/500/500"
  ],
  "createdAt": "2024-07-13T13:07:29.353Z",
  "reviews": [
    {
      "user": {
        "id": 1,
        "email": "test@test.com",
        "name": "Vivien",
        "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
        "phone": "7884565327529391372"
      },
      "createdAt": "2024-07-13T13:07:29.353Z",
      "id": 59,
      "text": "Velit agnosco compono temperantia canto substantia cresco demens atque. Territo laborum attonbitus stips tum delectus bis exercitationem alveus aduro. Vacuus tres decet cribro tenetur capitulus magnam vapulus cognatus.",
      "rating": 1
    },
    {
      "user": {
        "id": 1,
        "email": "test@test.com",
        "name": "Vivien",
        "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
        "phone": "7884565327529391372"
      },
      "createdAt": "2024-07-13T13:07:29.353Z",
      "id": 60,
      "text": "Tempore usus bestia cibus angustus velociter odit clibanus avaritia. Aegrotatio sonitus aequus. Theca circumvenio vulnero capitulus thorax doloribus tandem cras spoliatio.",
      "rating": 5
    }
  ],
  "category": {
    "id": 43,
    "name": "Grocery",
    "slug": "grocery"
  }
}
```

<h3 id="get-product-by-id">GET /products/:productId</h3>

**RESPONSE**

```json
{
  "id": 30,
  "name": "Handcrafted Plastic Computer",
  "slug": "handcrafted-plastic-computer",
  "price": 324,
  "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
  "images": [
    "https://loremflickr.com/500/500",
    "https://loremflickr.com/500/500",
    "https://loremflickr.com/500/500",
    "https://loremflickr.com/500/500"
  ],
  "createdAt": "2024-07-13T13:07:29.353Z",
  "reviews": [
    {
      "user": {
        "id": 1,
        "email": "test@test.com",
        "name": "Vivien",
        "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
        "phone": "7884565327529391372"
      },
      "createdAt": "2024-07-13T13:07:29.353Z",
      "id": 59,
      "text": "Velit agnosco compono temperantia canto substantia cresco demens atque. Territo laborum attonbitus stips tum delectus bis exercitationem alveus aduro. Vacuus tres decet cribro tenetur capitulus magnam vapulus cognatus.",
      "rating": 1
    },
    {
      "user": {
        "id": 1,
        "email": "test@test.com",
        "name": "Vivien",
        "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
        "phone": "7884565327529391372"
      },
      "createdAt": "2024-07-13T13:07:29.353Z",
      "id": 60,
      "text": "Tempore usus bestia cibus angustus velociter odit clibanus avaritia. Aegrotatio sonitus aequus. Theca circumvenio vulnero capitulus thorax doloribus tandem cras spoliatio.",
      "rating": 5
    }
  ],
  "category": {
    "id": 43,
    "name": "Grocery",
    "slug": "grocery"
  }
}
```

<h3 id="get-product-by-category">GET /products/by-category/health</h3>

**RESPONSE**

```json
[
  {
    "id": 29,
    "name": "Electronic Rubber Keyboard",
    "slug": "electronic-rubber-keyboard",
    "price": 385,
    "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    "images": [
      "https://loremflickr.com/500/500",
      "https://loremflickr.com/500/500",
      "https://loremflickr.com/500/500",
      "https://loremflickr.com/500/500"
    ],
    "createdAt": "2024-07-13T13:07:29.349Z",
    "reviews": [
      {
        "user": {
          "id": 1,
          "email": "test@test.com",
          "name": "Vivien",
          "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
          "phone": "7884565327529391372"
        },
        "createdAt": "2024-07-13T13:07:29.349Z",
        "id": 57,
        "text": "Cui ancilla eligendi quidem virtus adiuvo apto. Tibi amoveo succurro ocer. Undique sortitus ustilo adsuesco ater agnosco demergo utroque.",
        "rating": 2
      },
      {
        "user": {
          "id": 1,
          "email": "test@test.com",
          "name": "Vivien",
          "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
          "phone": "7884565327529391372"
        },
        "createdAt": "2024-07-13T13:07:29.349Z",
        "id": 58,
        "text": "Vestigium suffragium utpote sufficio vestigium tam. Speciosus acsi correptius. Cado conqueror thorax.",
        "rating": 4
      }
    ],
    "category": {
      "id": 42,
      "name": "Health",
      "slug": "health"
    }
  }
]
```

<h3 id="get-similar-product">GET /products/similar/productId</h3>

**RESPONSE**

```json
[]
```

<h3 id="create-product">POST /products</h3>

**RESPONSE**

```json
41
```

<h3 id="update-product">UPDATE /products/:productId</h3>

**REQUEST**

```json
{
  "name": "Phone",
  "price": 120,
  "images": ["https://loremflickr.com/500/500"],
  "categoryId": 46
}
```

**RESPONSE**

```json
{
  "id": 40,
  "createdAt": "2024-07-13T13:07:46.950Z",
  "updatedAt": "2024-07-13T16:41:49.894Z",
  "name": "Phone",
  "slug": "phone",
  "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
  "price": 120,
  "images": [
    "https://loremflickr.com/500/500"
  ],
  "categoryId": 46,
  "userId": null
}
```

<h3 id="delete-product">DELETE /products/:productId</h3>

**RESPONSE**

```json
{
  "id": 41,
  "createdAt": "2024-07-13T14:42:50.585Z",
  "updatedAt": "2024-07-13T14:44:44.280Z",
  "name": "Phone",
  "slug": "phone",
  "description": "",
  "price": 120,
  "images": [
    "https://loremflickr.com/500/500"
  ],
  "categoryId": 46,
  "userId": null
}
```

<h1>Order Endpoints</h1>
<h3 id="get-all-orders">GET /orders</h3>

**RESPONSE**

```json
[]
```

<h1>Reviews Endpoints</h1>
<h3 id="get-all-reviews">GET /reviews</h3>

**RESPONSE**

```json
[
  {
    "user": {
      "id": 1,
      "email": "test@test.com",
      "name": "Vivien",
      "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
      "phone": "7884565327529391372"
    },
    "createdAt": "2024-07-13T13:07:46.950Z",
    "id": 80,
    "text": "Coepi deludo crastinus curia clam torqueo sollers capillus. Derideo spiculum amitto atrox verumtamen thesaurus aggero expedita demitto substantia. Comitatus perspiciatis tabula usus.",
    "rating": 3
  },
  {
    "user": {
      "id": 1,
      "email": "test@test.com",
      "name": "Vivien",
      "avatarPath": "https://avatars.githubusercontent.com/u/46955440",
      "phone": "7884565327529391372"
    },
    "createdAt": "2024-07-13T13:07:46.950Z",
    "id": 79,
    "text": "Ante asporto acsi ter bellicus. Solus possimus alias commodi ager cunabula spiculum contra. Varius pauci tutamen vomer desino.",
    "rating": 4
  }
]
```

<h3 id="leave-review">POST /reviews/leave/:productId</h3>

**REQUEST**

```json
{
  "rating": 4,
  "text": "It is great product. I am very happy. This is my best day in all life!!!"
}
```

**RESPONSE**

```json
{
  "id": 83,
  "createdAt": "2024-07-13T16:46:11.680Z",
  "updatedAt": "2024-07-13T16:46:11.680Z",
  "rating": 4,
  "text": "It is great product. I am very happy. This is my best day in all life!!!",
  "userId": 4,
  "productId": 40
}
```

<h1>Statistic Endpoints</h1>
<h3 id="get-all-statistic">GET /statistics/main</h3>

**RESPONSE**

```json
[
  {
    "name": "Orders",
    "value": 0
  },
  {
    "name": "Reviews",
    "value": 2
  },
  {
    "name": "Favorites",
    "value": 0
  },
  {
    "name": "Total amount",
    "value": 1000
  }
]
```


<h2 id="contribute">🧑‍💻 You can be a hero</h2>

I will be glad if you will give this project a start which can help me to become a better developer⭐😜🙃