import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TabViewAnimated, TabViewPage, TabBarBottom } from 'react-native-tab-view';
import ListViewExample from './ListViewExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#2196f3',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class TopBarIconExample extends Component {
  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    navigation: {
      index: 0,
      routes: [
        { key: '1' },
        { key: '2' },
        { key: '3' },
      ],
    },
  };

  _handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  };

  _renderIcon = ({ route }) => {
    switch (route.key) {
    case '1':
      return <Image source={require('../assets/tab-icon-1.png')} />;
    case '2':
      return <Image source={require('../assets/tab-icon-2.png')} />;
    case '3':
      return <Image source={require('../assets/tab-icon-3.png')} />;
    default:
      return null;
    }
  };

  _renderFooter = (props) => {
    return (
      <TabBarBottom
        {...props}
        pressColor='rgba(0, 0, 0, .2)'
        renderIcon={this._renderIcon}
        style={styles.tabbar}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <ListViewExample />;
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    case '3':
      return <View style={[ styles.page, { backgroundColor: '#4caf50' } ]} />;
    default:
      return null;
    }
  };

  _renderPage = (props) => {
    return (
      <TabViewPage
        {...props}
        panHandlers={null}
        renderScene={this._renderScene}
      />
    );
  };

  _configureAnimation = (animatedValue, toValue) => {
    animatedValue.setValue(toValue);
  };

  render() {
    return (
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state.navigation}
        configureAnimation={this._configureAnimation}
        renderScene={this._renderPage}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}