import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';

class Claim extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.FectApi();
  }
  FectApi() {
    fetch('http://104.211.160.16:89/api/SVGD_AddSavingsDeclarationMaster', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'dolB2/eUb7oieUBWAZeazYB4xM1TECH8pS1ohSFFLyt2oan3Di70E1I7AZdpZGKYw5KRYe5Z7yzW9LuN4CEhY3EoOtJvCZs8BqY/nDAVePr3F9Wk6JjMJ0RQMfCXV8qdI/HgzPaN7ezZve0aS+cMsIK1/r7fjX98I3gMeV+zfSRZBJN6DYe3UAEF/QGIkLr3zhs20wLfEC9jS42ZeqNjliLh2spgzOd54TPMYbe1WZM0PIpfU+eFfCFB/QO2T15CB30DaPvpEQNMCpQmxT7xv3XtEspfkNDpt5HnU9cdEec54nMAQK/rYIKRG2/Yqi2TOQm29h8UzDxaLJMhc5jy8+xKEjXKLQWMsihXAAGzp/mIipy0iNzs62s+aRLB5l7ku+KnCOGAYQWrCF97UDg+ezW/j9Ch+95iTJtOip7bbBVCDa6rvRNpi1GyZJ7Te7xdUtBMMc/IxHXIK3ZzbDkedOUNUAhrQOYuPPpKWrjTLz72n3/UPngWMuQXLFQwbvS2wbL/aNFy2xtRTGTHkXSxRLT4lfUFET/is2eN4MU7wgmVrVJ75meNY0lMoZekbYKCOJGI007DnVPBRJcPfHa1tHZuuqcvu30WKyHUHQdIumO7o7cYThaMZHoTXlOyQ25PMUqfd3GTT6TxKLWMLkcK5FWEr+IIwsuUHNYTmGb2Wox5bEKTi+MbXTIzj1nverJFYax6/dViY25EPyluDAVsc1FuTKywlqdYpHkhfne+/BRtRYY7F7ch2yS04Euekb4T4o8N3tlgL+39RfxGIyWmZ4DUjmhCEcTBbSDqf/hoZNeqGfKiADsZCvP1EC3nZAWBDf3rXDidDVqtr/H2mqxUMj9gF8pg1znEZjD2XthK2k8HqZaA6Qmv7cKT0bNuPsnkBTzhBEt5fsUI4fxh1Kc5NAv0KRsTbO0DncO2JDsqjHPVoXs9WXBv8UDsuMtZRInO',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        //console.log(response);
        //this.DisplayValue(response.SavingsDeclarationMaster);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.mainPage}>
        <LinearGradient
          colors={['#6484e3', '#4ac0d1']}
          style={styles.headerLayout}
          useAngle={true}
          angle={45}
          angleCenter={{x: 0.5, y: 0.5}}>
          <View style={styles.headerLayout}>
            <Text style={styles.headerText}>FBP Claim</Text>
          </View>
        </LinearGradient>
        <View style={styles.body}>
          <View style={{padding: 8}}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: 8,
                elevation: 4,
                paddingBottom: 4,
                paddingTop: 4,
                paddingLeft: 8,
                paddingRight: 8,
              }}
              onPress={() => {
                Actions.newclaim();
              }}>
              <Text>Add New FBP Claim</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.approval_card}>
            <LinearGradient
              colors={['#6484e3', '#4ac0d1']}
              style={{
                padding: 4,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              }}
              useAngle={true}
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}>
              <Text style={{color: '#fff', paddingLeft: 8, paddingRight: 8}}>
                FBP Claim Approval Details Report
              </Text>
            </LinearGradient>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.smalltext}>FBP Head</Text>
              <Text style={styles.smalltext}>Declaration Amount</Text>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.smalltext}>Total Amount</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={styles.smalltext}>Approval</Text>
                  <Text style={styles.smalltext}>Balalance</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 1.5,
                backgroundColor: '#6484e3',
                opacity: 0.8,
              }}
            />
            <View>
              <Text style={{padding: 4, color: 'grey', fontStyle: 'italic'}}>
                No Claim Details Found!
              </Text>
            </View>
          </View>
          {/* My Claim */}
          <View style={styles.approval_card}>
            <LinearGradient
              colors={['#6484e3', '#4ac0d1']}
              style={{
                padding: 4,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              }}
              useAngle={true}
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}>
              <Text style={{color: '#fff', paddingLeft: 8, paddingRight: 8}}>
                My Claims -#0
              </Text>
            </LinearGradient>
            <View>
              <Text style={{padding: 4, color: 'grey', fontStyle: 'italic'}}>
                No Claim Details Found!
              </Text>
            </View>
          </View>

          {/*  <View style={styles.bodyContent}>
            <View
              style={{
                flex: 1,
                elevation: 8,
                alignItems: 'center',
              }}>
              <Text>hi</Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  }
}

//#30496B
const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerLayout: {
    flex: 0.8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: -30,
  },
  textCenter: {
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  liteContrast: {
    color: '#ACACAC',
    fontSize: 12,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 5.2,
    /* flexDirection: 'column', */
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 8,
    paddingTop: 12,
    marginTop: -30,
    /* alignContent: 'center',
    alignItems: 'center', */

    /* "linear-gradient(to right, #30496B,#30B8D2)" */
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    /* "linear-gradient(to right, #30496B,#30B8D2)" */
  },
  cardItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    margin: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  imgIcon: {
    height: 32,
    width: 32,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  submit_btn: {
    flex: 1,
    backgroundColor: '#6484e3',
    borderRadius: 50,
    elevation: 8,
    height: 32,
    margin: 10,
    flexDirection: 'row',
    color: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  draft_btn: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#6484e3',
    borderRadius: 50,
    elevation: 8,
    height: 32,
    margin: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  approval_card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    elevation: 4,
  },
  smalltext: {
    fontSize: 12,
    paddingLeft: 4,
    paddingRight: 4,
  },
});

export default Claim;
