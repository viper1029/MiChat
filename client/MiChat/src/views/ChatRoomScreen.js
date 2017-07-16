import React, {Component} from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Platform
} from 'react-native'
import {Actions as NavActions} from 'react-native-router-flux'
import Colors from '../config/Colors'
import API from '../api/Api'

class ChatRoomScreen extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            userID: this.props.userID
        };
        this.api = API.create();
    }

    componentWillMount() {
        this.api.getChatRooms().then(this.setChatRoomList.bind(this));
    }

    setChatRoomList(chatRoomList) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(chatRoomList.data.roomList)
        })
    }

    handleChatRoomPress() {
        NavActions.chatScreen({userID: this.state.userID})
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <TouchableHighlight
                            underlayColor='green'
                            onPress={this.handleChatRoomPress.bind(this)}
                        >
                            <View style={styles.listItem}>
                                <View style={styles.listInfo}>
                                    <Text style={styles.roomLabel}>{rowData}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                />
            </ScrollView >
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        marginTop: (Platform.OS === 'ios') ? 64 : 54
    },
    listContainer: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f8fc',
        borderBottomWidth: 0.5,
        borderColor: '#D0DBE4',
        padding: 5,
        paddingTop: 15,
        paddingBottom: 15
    },
    listInfo: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    roomLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#60768b',
    }
});

export default ChatRoomScreen