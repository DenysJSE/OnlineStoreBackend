import * as dotenv from 'dotenv'
import {PrismaClient, Product} from "@prisma/client";
import {faker} from "@faker-js/faker";
import {generateSlug} from "../src/utils/generate-slug";
import {getRandomNumber} from "../src/utils/random-number";

dotenv.config()
const prisma = new PrismaClient()

const createProduct = async (quantity: number) => {
  const products: Product[] = []

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName()
    const categoryName = faker.commerce.department()

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: generateSlug(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(10, 999, 0),
        images: Array.from({length: getRandomNumber(2, 6)}).map(() => faker.image.imageUrl(500, 500)),
        category: {
          create: {
            name: categoryName,
            slug: generateSlug(categoryName)
          }
        },
        reviews: {
          create: [
            {
              rating: faker.datatype.number({min: 1, max: 5}),
              text: faker.lorem.paragraph(),
              user: {connect: {id: 1}}
            },
            {
              rating: faker.datatype.number({min: 1, max: 5}),
              text: faker.lorem.paragraph(),
              user: {connect: {id: 1}}
            }
          ]
        }
      }
    })

    products.push(product)
  }

  console.log(`Created ${products.length} products`)
}

async function main() {
  console.log('Start seeding...')
  await createProduct(50)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })