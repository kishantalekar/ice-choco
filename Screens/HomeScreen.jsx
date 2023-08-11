import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import Header from "../components/Header";
import CarouselComponent from "../components/CarouselComponent";
import Categories from "../components/Categories";
import PopularBrands from "../components/PopularBrands";
import {
  getCategories,
  getFeatureds,
  getIceCreamBySearchQuery,
} from "../sanity";
import FeaturedRow from "../components/FeaturedRow";
import ProductSearch from "../components/ProductSearch";

const HomeScreen = () => {
  const [featured, setFeatured] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    try {
      setRefreshing(true);
      // Perform data fetching or any other operations you need here
      // For example, you can fetch new data from an API, update state, etc.
      getFeaturedsFromSanity();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000); // You can set a delay to simulate the loading time
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFeaturedsFromSanity = async () => {
      try {
        const data = await getFeatureds();
        setFeatured(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedsFromSanity();
  }, []);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      if (searchQuery.trim() === "") {
        setSearchResults([]);
      } else {
        try {
          const results = await getIceCreamBySearchQuery(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getSearchResults();
  }, [searchQuery]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {searchQuery && searchQuery.length > 0 ? (
        <ProductSearch
          iceCreams={searchResults}
          searchQuery={searchQuery}
          setLoading={setLoading}
          loading={loading}
        />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <CarouselComponent refreshing={refreshing} />
            <Categories refreshing={refreshing} />
            <PopularBrands />
            {featured?.map((featured) => (
              <FeaturedRow key={featured?._id} featured={featured} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
