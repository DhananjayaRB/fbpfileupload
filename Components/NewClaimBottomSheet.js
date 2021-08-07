import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NewClaimBottomSheet = () => {
  return (
    <View style={styles.mainPage}>
      <Text style={{color: '#6484e3'}}>Bill Information</Text>
      <View
        style={{
          height: 1.5,
          backgroundColor: '#6484e3',
          opacity: 0.8,
        }}
      />
      <View>
        <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
          Bill Number
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=""
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>Bill Date</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=""
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
          Bill Amount
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=""
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
          Bill Description
        </Text>
        <TextInput
          style={[styles.input, {height: 52}]}
          underlineColorAndroid="transparent"
          placeholder=""
          autoCapitalize="none"
          multiline={true}
          scrollEnabled={true}
          numberOfLines={3}
        />
      </View>
      <View>
        <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
          Bill Attach
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Choose"
          autoCapitalize="none"
        />
      </View>
      <View style={{padding: 8}}>
            <LinearGradient
              colors={['#6484e3', '#4ac0d1']}
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#fff',
                borderRadius: 20,
                elevation: 4,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
              }}
              useAngle={true}
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  paddingLeft: 12,
                  paddingRight:12,
                  paddingTop:6,
                  paddingBottom:6,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight:'bold'
                  }}>
                  Add
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  input: { 
    backgroundColor: 'gainsboro', 
    height: 38, 
    borderRadius: 8,
  },

});
export default NewClaimBottomSheet;
