import faker from "faker";

export const genProducts = (n) => {
  let arr = new Array(n);
  for (let i=0; i<n; i++) {
    arr[i] = {
      image: faker.image.image(),
      productName: faker.commerce.productName(),
      price: faker.commerce.price()
    }
  }
  return arr
}

export const genPosts = (n) => {
  let arr = new Array(n);
  for (let i=0; i<n; i++) {
    arr[i] = {
      title: faker.lorem.sentence(),
      writer: faker.name.firstName(),
      // date: faker.date.past(10, new Date()),
      content: faker.lorem.paragraphs()
    }
  }
  return arr
}