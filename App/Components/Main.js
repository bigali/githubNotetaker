var React = require('react-native');
var api=require('../Utils/api');

var {
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    TouchableHighlight
    }=React;
var GiftedSpinner = require('react-native-gifted-spinner');
var Dashboard=require('./Dashboard');

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: (Platform.OS === 'ios') ? 65 : 0,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2196F3'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        margin: 10,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: (Platform.OS === 'ios') ? 8 : 0,
        margin: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isLoading: false,
            error: false
        }
    }

    handleChange(event){
        this.setState({
			username: event.nativeEvent.text
		});
    }

    handleSubmit(){
        this.setState({
			isLoading: true
		});

        api.getBio(this.state.username).
        then((res)=>{
            if(res.message==='Not Found'){
                this.setState({
                    error: 'User not found',
                    isLoading: false
                });
            }else{
                this.props.navigator.push({
                    title:res.name || "select an Option",
                    component: Dashboard,
                    name:'dashboard',
                    passProps: {userInfo: res}
                });
                this.setState({
                    isLoading: false,
                    error: false,
                    username: ''
                })
            }
        });
    }
    render() {
        var showErr = (
            this.state.error ? <Text>{this.state.error}</Text> : <View></View>
        );
        var showSpinner= (
            this.state.isLoading ? <GiftedSpinner color="white" size="large"/>: <View></View>

        );
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>
                    Search for a Github User
                </Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    onChange={this.handleChange.bind(this)}
                    underlineColorAndroid="white"
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.buttonText}>
                            SEARCH
                    </Text>
                </TouchableHighlight>
                {showErr}
                {showSpinner}
            </View>);
    }
}
;

module.exports = Main;
