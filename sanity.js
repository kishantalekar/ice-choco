import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "your project id",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-08-12",
  token: "your token",
});

const builder = ImageUrlBuilder(client);
export const getCategories = async () => {
  try {
    const categories = await client.fetch(`
    *[_type == 'category']{
        ...,
    }
    `);
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const getBrands = async () => {
  try {
    const categories = await client.fetch(`
    *[_type == 'brand']{
        ...,
    }
    `);
    return categories;
  } catch (error) {
    console.log(error);
  }
};
export const getFeatureds = async () => {
  try {
    const featureds = await client.fetch(`
           *[_type == "featured"] {
          ...,
          iceCream[]->{
            ...,
          }
        }
            `);
    return featureds;
  } catch (error) {
    console.log(error);
  }
};

export const getImages = async () => {
  try {
    const images = await client.fetch(`
         *[_type == "carousel"] {
      ...,

    }`);

    return images;
  } catch (error) {
    console.log(error);
  }
};

export const getIceCreamByCategoryOrBrandID = async (type, id) => {
  try {
    const data = await client.fetch(`
           *[_type == "iceCream" && ${type}._ref=="${id}"] {
      ...,
    }
    `);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getIceCreamBySearchQuery = async (query) => {
  try {
    const data = await client.fetch(`
        *[_type == 'iceCream' && (

      name match '${query}' ||
      category->name match '${query}' ||
      brand->name match '${query}' ||
      name match '${query}' ||
      category->name match '${query}' ||
      brand->name match '${query}' ||
      name match '${query}'
    )]`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getIceCreamById = async (id) => {
  try {
    const data = await client.fetch(`
  *[_type == 'iceCream' && _id == "${id}"]{
    ...,
  }
  `);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const urlFor = (source) => builder.image(source);
