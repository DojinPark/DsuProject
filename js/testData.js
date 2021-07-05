import React from "react";
import { Image } from "react-native";
import faker from "faker";

export const genProduct = () => {
  return {
    image: getImage(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price()
  }
}

export const genProducts = (n) => {
  let arr = new Array(n);
  for (let i=0; i<n; i++) {
    arr[i] = genProduct()
  }
  return arr
}

const getImage = () => {
  return(
    <Image
      style={{height:80, width:200}}
      source={{uri: faker.image.image(200, 80, true)}}
    />
  )
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
