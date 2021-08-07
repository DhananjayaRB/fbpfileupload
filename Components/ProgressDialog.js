import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Modal, StyleSheet} from 'react-native';

class ProgressDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: props.modalVisible,
    };
    //console.log('ProgressDialog------->',this.state.modalVisible);
  }
  render() {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Modal visible={this.props.modalVisible}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000020',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
                width: '80%',
                alignItems: 'center',
              }}>
              <Text /* style={styles.progressHeader} */>Loading...</Text>
              <ActivityIndicator size="large" color="#f35588" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default ProgressDialog;
