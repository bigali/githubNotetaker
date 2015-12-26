var React = require('react-native');

var {
	View,
	StyleSheet,
    WebView
} = React;

var styles = StyleSheet.create({
	container: {
        backgroundColor: '#F6F6F6',
        flex:1,
        flexDirection:'column',
	}
});

class Web extends React.Component{
	render() {
		return(
			<View style={styles.container}>
                <WebView url={this.props.url}/>
            </View>
		)
	}
};


Web.propTypes = {
	url: React.PropTypes.string.isRequired
};



module.exports = Web;