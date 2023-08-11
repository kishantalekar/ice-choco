import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import axios from "axios";

export const client = createClient({
  projectId: "zetdffzm",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-08-12",
  token:
    "skvsrxXzz5OhlMqXu61SzdnXWZ4fDJ3w6UFUxmp35dJNy00nAU0VLUP9NuCWuHQIGUiVV2gspdQ0AIRN8GvfY9fiHvvdjGNsuUr2MiX1NAR4gvUBYV5RQKnjTxPsa4wqjLs9Brn1N4L71DvlryUvqXY3esxZviCZSl0i6x7L0XfynXn9wqST",
});

const builder = ImageUrlBuilder(client);
export const getCategories = async () => {
  try {
    // const categories = await client.fetch(`
    // *[_type == 'category']{
    //     ...,
    // }
    // `);
    const query = `
            *[_type == 'category']{
                ...,
            }
          `;
    const res = await axios.get(
      "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-ice-creams",
      {
        params: {
          query: query,
        },
      }
    );
    if (res && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBrands = async () => {
  try {
    // const categories = await client.fetch(`
    // *[_type == 'brand']{
    //     ...,
    // }
    // `);
    const query = `
    *[_type == 'brand']{
        ...,
    }
    `;
    let categories = await axios.get(
      "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-ice-creams",
      {
        params: {
          query: query,
        },
      }
    );
    if (!categories || categories === undefined || categories.length == 0) {
      return [];
    }
    return categories && categories?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getFeatureds = async () => {
  try {
    //     const featureds = await client.fetch(`
    //        *[_type == "featured"] {
    //       ...,
    //       iceCream[]->{
    //         ...,
    //       }
    //     }
    //         `);
    const query = `
       *[_type == "featured"] {
      ...,
      iceCream[]->{
        ...,
      }
    }
        `;
    const res = await axios.get(
      "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-featureds",
      {
        params: {
          query: query,
        },
      }
    );

    if (res && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
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
    const query = `
     *[_type == "carousel"] {
  ...,

}`;
    // const images = await axios.get(
    //   "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-ice-creams",
    //   {
    //     params: {
    //       query: query,
    //     },
    //   }
    // );
    return images;
  } catch (error) {
    console.log(error);
  }
};

export const getIceCreamByCategoryOrBrandID = async (type, id) => {
  try {
    // const data = await client.fetch(`
    //        *[_type == "iceCream" && ${type}._ref=="${id}"] {
    //   ...,
    // }
    // `);
    const query = `
           *[_type == "iceCream" && ${type}._ref=="${id}"] {
      ...,
    }
    `;
    const res = await axios.get(
      "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-ice-creams",
      {
        params: {
          query: query,
        },
      }
    );

    if (res && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getIceCreamBySearchQuery = async (query) => {
  try {
    //     const data = await client.fetch(`
    //     *[_type == 'iceCream' && (

    //   name match '${query}' ||
    //   category->name match '${query}' ||
    //   brand->name match '${query}' ||
    //   name match '${query}' ||
    //   category->name match '${query}' ||
    //   brand->name match '${query}' ||
    //   name match '${query}'
    // )]`);

    const query = `
    *[_type == 'iceCream' && (
  
  name match '${query}' ||
  category->name match '${query}' ||
  brand->name match '${query}' ||
  name match '${query}' ||
  category->name match '${query}' ||
  brand->name match '${query}' ||
  name match '${query}'
)]`;

    const res = await axios.get(
      "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-featureds",
      {
        params: {
          query: query,
        },
      }
    );
    if (res && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
export const getIceCreamById = async (id) => {
  // const data = await client.fetch(`
  // *[_type == 'iceCream' && _id == "${id}"]{
  //   ...,
  // }
  // `);
  try {
    const query = `
  *[_type == 'iceCream' && _id == "${id}"]{
    ...,
  }
  `;
    const res = await axios.get(
      "https://f40f-2409-408c-8d81-2483-1918-b8ce-c556-3367.ngrok.io/get-featureds",
      {
        params: {
          query: query,
        },
      }
    );
    if (res && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
export const urlFor = (source) => builder.image(source);
