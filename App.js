/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import SiteComponent from './Site';
import Axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  async componentDidMount() {
    this.fetchResult();
  }
  renderImageView = (item) => {
    console.log('FlatList: item', item.urls.small);
    return (
      <SiteComponent logo={item.urls.small} name="this is sample download" />
    );
  };
  fetchModeDateFromAPI = () => {
    const photoUrl = `https://api.unsplash.com/search/photos?client_id=MgllgRq7xd3TYgttzB1esqxfnFvC90sn9HLbUTRWclw&query=canada&page=1&per_page=5`;
    return Axios.get(photoUrl);
  };

  fetchResult = () => {
    const {offset, limit} = this.state;
    this.fetchModeDateFromAPI(offset, limit)
      .then((res) => {
        console.log('coming to fetchResult', res.data.results);

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
        console.log('fetchModeDateFromAPI:Error', error);
      });
  };

  loadInfiteImages = () => {
    console.log('loadInfiteImages');
    const {list} = this.state;
    if (list && list.length > 0) {
      return (
        <FlatList
          style={{flex: 1}}
          extraData={this.state}
          onEndReached={this.fetchResult}
          onEndReachedThreshold={0.7}
          data={this.state.list}
          renderItem={({item}) => this.renderImageView(item)}
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
  },
});

export default App;
