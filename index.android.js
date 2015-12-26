'use strict';

var React = require('react-native');
var {
    AppRegistry,
    BackAndroid,
    Navigator,
    StyleSheet,
    ToolbarAndroid,
    View,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#0D47A1',
        height: 56,
    },
});


var Main = require('./App/Components/Main');
var Dashboard = require('./App/Components/Dashboard');
var Profile = require('./App/Components/Profile');
var Repositories=require('./App/Components/Repositories');
var Notes=require('./App/Components/Notes');
var WebView=require('./App/Helpers/WebView');
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var RouteMapper = function (route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    if (route.name === 'main') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.title}/>
                <Main
                    style={{flex: 1}}
                    navigator={navigationOperations}
                />
            </View>
        );
    } else if (route.name === 'dashboard') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('image!android_back_white')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.title}/>
                <Dashboard
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    userInfo={route.passProps.userInfo}
                />
            </View>
        );
    } else if (route.name === 'profile') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('image!android_back_white')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.title}/>
                <Profile
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    userInfo={route.passProps.userInfo}
                />
            </View>
        );
    }else if (route.name === 'repos') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('image!android_back_white')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.title}/>
                <Repositories
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    userInfo={route.passProps.userInfo}
                    repos={route.passProps.repos}

                />
            </View>
        );
    }else if (route.name === 'notes') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('image!android_back_white')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.title}/>
                <Notes
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    userInfo={route.passProps.userInfo}
                    notes={route.passProps.notes}

                />
            </View>
        );
    }else if (route.name === 'webview') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('image!android_back_white')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.title}/>
                <WebView
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    url={route.passProps.url}

                />
            </View>
        );
    }
};


class githubNoteTaker extends React.Component {
    render() {
        var initialRoute = {name: 'main', title: 'GitHub Notetaker'};
        return (
            <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={RouteMapper}
            />
        );
    }
}
;


AppRegistry.registerComponent('githubNoteTaker', () => githubNoteTaker);
