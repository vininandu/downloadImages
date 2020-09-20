import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {normalizeVerticaly} from './Normalizer';

const statusTypes = {
  notStarted: 'Not Started',
  inprogress: 'In progress',
};
const style = StyleSheet.create({
  container: {
    borderBottomColor: '#A0A0A0',
    borderBottomWidth: 1,
    elevation: 5,
    marginBottom: 12,
  },
  siteLogo: {
    height: normalizeVerticaly(111),
    width: '100%',
  },
  nameContainer: {
    padding: 20,
  },
});

const Site = ({logo, name, onPress}) => {
  function changeStatus() {
    onPress();
  }

  return (
    <TouchableOpacity
      onPress={changeStatus.bind(this, statusTypes.inprogress)}
      style={style.container}>
      {/*TODO default will be replaced with logoUri*/}

      <Image source={{uri: logo}} style={style.siteLogo} />
      <Text size={18} style={style.nameContainer}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Site;
