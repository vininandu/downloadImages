/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import SiteComponent from "./Site";
import Axios from "axios";
const { height } = Dimensions.get("window");
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  async componentDidMount() {
    this.fetchResult(0, 5);
  }
  renderImageView = (item) => {
    console.log("FlatList: item", item.urls.small);
    return (
      <SiteComponent logo={item.urls.small} name="this is sample download" />
    );
  };
  fetchModeDateFromAPI = (limit) => {
    const photoUrl = `https://api.unsplash.com/search/photos?client_id=MgllgRq7xd3TYgttzB1esqxfnFvC90sn9HLbUTRWclw&query=canada&per_page=${limit}`;
    return Axios.get(photoUrl);
  };

  fetchResult = (distanceFromEnd, limit) => {
    const { offset } = this.state;
    console.log("coming to end of the page", distanceFromEnd, limit);
    this.fetchModeDateFromAPI(limit)
      .then((res) => {
        console.log("coming to fetchResult", res.data.results);

        if (!res.data.results) {
          return;
        }
        this.setState({
          list: res.data.results,
          offset: offset + 100,
          limit: limit,
        });
      })
      .catch((error) => {
        console.log("fetchModeDateFromAPI:Error", error);
      });
  };

  loadInfiteImages = () => {
    console.log("loadInfiteImages");
    const { list, limit } = this.state;
    if (list && list.length > 0) {
      return (
        <FlatList
          style={{ flex: 1 }}
          extraData={this.state}
          onEndReached={({ distanceFromEnd }) => {
            console.log("distanceFromEnd", distanceFromEnd);
            if (distanceFromEnd < 0) {
              return;
            }
            this.fetchResult(distanceFromEnd, limit + 5);
          }}
          onEndReachedThreshold={0.2}
          data={this.state.list}
          renderItem={({ item }) => this.renderImageView(item)}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    } else {
      return <Text>LOADING</Text>;
    }
  };

  render() {
    return <View style={styles.container}>{this.loadInfiteImages()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    height: height,
  },
});

export default App;
