import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Picker,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NewClaimBottomSheet from './NewClaimBottomSheet';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import ProgressDialog from './ProgressDialog';
class NewClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHead: 'Select',
      selectedID: 0,
      dcl_amount: 0,
      claim_date: moment().format('DD-MMM-YYYY'), //Date.now().toString('dd-MM-yyyy'),
      FbpHeadDetails: [
        {
          PayHeadID: '0',
          PayHead: 'Select',
        },
      ],
      workflow_id: 0,
      bill_num: '',
      bill_date: '',
      bill_amt: 0,
      bill_desc: '',
      bill_attach: 'Choose',
      bill_s3_path: '',
      fbp_array:[],
      isDatePickerVisible: false,
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.fetch_fbp_head();
    this.fetch_fbp_workflow_id();
  }
  async fetch_fbp_head() {
    await fetch('http://104.211.160.16:89/api/fetch_fbp_claim_heads', {
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
        for (const key in response.FbpHeadDetails) {
          const element = response.FbpHeadDetails[key];
          this.state.FbpHeadDetails.push(element);
        }

        this.setState({
          //FbpHeadDetails,
        });
        //console.log(this.state.FbpHeadDetails);
        //this.DisplayValue(response.SavingsDeclarationMaster);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async fetch_dcl_amt(Payhead) {
    //alert(Payhead);
    await fetch(
      'http://104.211.160.16:89/api/fetch_fbp_declaration_amount_details',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token:
            'dolB2/eUb7oieUBWAZeazYB4xM1TECH8pS1ohSFFLyt2oan3Di70E1I7AZdpZGKYw5KRYe5Z7yzW9LuN4CEhY3EoOtJvCZs8BqY/nDAVePr3F9Wk6JjMJ0RQMfCXV8qdI/HgzPaN7ezZve0aS+cMsIK1/r7fjX98I3gMeV+zfSRZBJN6DYe3UAEF/QGIkLr3zhs20wLfEC9jS42ZeqNjliLh2spgzOd54TPMYbe1WZM0PIpfU+eFfCFB/QO2T15CB30DaPvpEQNMCpQmxT7xv3XtEspfkNDpt5HnU9cdEec54nMAQK/rYIKRG2/Yqi2TOQm29h8UzDxaLJMhc5jy8+xKEjXKLQWMsihXAAGzp/mIipy0iNzs62s+aRLB5l7ku+KnCOGAYQWrCF97UDg+ezW/j9Ch+95iTJtOip7bbBVCDa6rvRNpi1GyZJ7Te7xdUtBMMc/IxHXIK3ZzbDkedOUNUAhrQOYuPPpKWrjTLz72n3/UPngWMuQXLFQwbvS2wbL/aNFy2xtRTGTHkXSxRLT4lfUFET/is2eN4MU7wgmVrVJ75meNY0lMoZekbYKCOJGI007DnVPBRJcPfHa1tHZuuqcvu30WKyHUHQdIumO7o7cYThaMZHoTXlOyQ25PMUqfd3GTT6TxKLWMLkcK5FWEr+IIwsuUHNYTmGb2Wox5bEKTi+MbXTIzj1nverJFYax6/dViY25EPyluDAVsc1FuTKywlqdYpHkhfne+/BRtRYY7F7ch2yS04Euekb4T4o8N3tlgL+39RfxGIyWmZ4DUjmhCEcTBbSDqf/hoZNeqGfKiADsZCvP1EC3nZAWBDf3rXDidDVqtr/H2mqxUMj9gF8pg1znEZjD2XthK2k8HqZaA6Qmv7cKT0bNuPsnkBTzhBEt5fsUI4fxh1Kc5NAv0KRsTbO0DncO2JDsqjHPVoXs9WXBv8UDsuMtZRInO',
          finacial_start_date: '2021-04-01',
          finacial_end_date: '2022-03-01',
          fbpclaimid: Payhead,
        }),
      },
    )
      .then(responseJson => responseJson.json())
      .then(response => {
        this.setState({
          dcl_amount: response.DeclarationAmt,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async fetch_fbp_workflow_id() {
    await fetch('http://104.211.160.16:89/api/fetch_fbp_workflow_id', {
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
        this.setState({
          workflow_id: response.Work_Flow_Id[0].wfid,
        });
        //console.log(this.state.workflow_id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async File_upload(file_String, extension) {
    await fetch('http://52.172.28.13:85/api/storeawsfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'dolB2/eUb7oieUBWAZeazYB4xM1TECH8pS1ohSFFLyt2oan3Di70E1I7AZdpZGKYw5KRYe5Z7yzW9LuN4CEhY3EoOtJvCZs8BqY/nDAVePr3F9Wk6JjMJ0RQMfCXV8qdI/HgzPaN7ezZve0aS+cMsIK1/r7fjX98I3gMeV+zfSRZBJN6DYe3UAEF/QGIkLr3zhs20wLfEC9jS42ZeqNjliLh2spgzOd54TPMYbe1WZM0PIpfU+eFfCFB/QO2T15CB30DaPvpEQNMCpQmxT7xv3XtEspfkNDpt5HnU9cdEec54nMAQK/rYIKRG2/Yqi2TOQm29h8UzDxaLJMhc5jy8+xKEjXKLQWMsihXAAGzp/mIipy0iNzs62s+aRLB5l7ku+KnCOGAYQWrCF97UDg+ezW/j9Ch+95iTJtOip7bbBVCDa6rvRNpi1GyZJ7Te7xdUtBMMc/IxHXIK3ZzbDkedOUNUAhrQOYuPPpKWrjTLz72n3/UPngWMuQXLFQwbvS2wbL/aNFy2xtRTGTHkXSxRLT4lfUFET/is2eN4MU7wgmVrVJ75meNY0lMoZekbYKCOJGI007DnVPBRJcPfHa1tHZuuqcvu30WKyHUHQdIumO7o7cYThaMZHoTXlOyQ25PMUqfd3GTT6TxKLWMLkcK5FWEr+IIwsuUHNYTmGb2Wox5bEKTi+MbXTIzj1nverJFYax6/dViY25EPyluDAVsc1FuTKywlqdYpHkhfne+/BRtRYY7F7ch2yS04Euekb4T4o8N3tlgL+39RfxGIyWmZ4DUjmhCEcTBbSDqf/hoZNeqGfKiADsZCvP1EC3nZAWBDf3rXDidDVqtr/H2mqxUMj9gF8pg1znEZjD2XthK2k8HqZaA6Qmv7cKT0bNuPsnkBTzhBEt5fsUI4fxh1Kc5NAv0KRsTbO0DncO2JDsqjHPVoXs9WXBv8UDsuMtZRInO',
        documentname:
          'AAF133_' +
          'FBPClaim' +
          '_' +
          Date.now()
            .toString()
            .substring(Date.now().toString().length - 4),
        extension: extension,
        document: file_String,
        email: 'sathishr@aafindia.net',
        projectname: 'FBP',
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        this.setState({
          bill_s3_path: response.URL,
          modalVisible: false,
        });
        //console.warn('bill_path--->' + response.URL);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          modalVisible: false,
        });
      });
  }

  async submit_claim(fbparray) {
    this.setState({
      modalVisible:true,
    });
    this.state={
      FY_START : moment().year() + '-04-01',
      FY_END : (moment().year() + 1) + '-03-31',
      _claim_date : moment().format('YYYY-MM-DD'),
    }
    console.log(this.state.selectedHead);
    /* console.log(JSON.stringify({
      token:
        'dolB2/eUb7oieUBWAZeazYB4xM1TECH8pS1ohSFFLyt2oan3Di70E1I7AZdpZGKYw5KRYe5Z7yzW9LuN4CEhY3EoOtJvCZs8BqY/nDAVePr3F9Wk6JjMJ0RQMfCXV8qdI/HgzPaN7ezZve0aS+cMsIK1/r7fjX98I3gMeV+zfSRZBJN6DYe3UAEF/QGIkLr3zhs20wLfEC9jS42ZeqNjliLh2spgzOd54TPMYbe1WZM0PIpfU+eFfCFB/QO2T15CB30DaPvpEQNMCpQmxT7xv3XtEspfkNDpt5HnU9cdEec54nMAQK/rYIKRG2/Yqi2TOQm29h8UzDxaLJMhc5jy8+xKEjXKLQWMsihXAAGzp/mIipy0iNzs62s+aRLB5l7ku+KnCOGAYQWrCF97UDg+ezW/j9Ch+95iTJtOip7bbBVCDa6rvRNpi1GyZJ7Te7xdUtBMMc/IxHXIK3ZzbDkedOUNUAhrQOYuPPpKWrjTLz72n3/UPngWMuQXLFQwbvS2wbL/aNFy2xtRTGTHkXSxRLT4lfUFET/is2eN4MU7wgmVrVJ75meNY0lMoZekbYKCOJGI007DnVPBRJcPfHa1tHZuuqcvu30WKyHUHQdIumO7o7cYThaMZHoTXlOyQ25PMUqfd3GTT6TxKLWMLkcK5FWEr+IIwsuUHNYTmGb2Wox5bEKTi+MbXTIzj1nverJFYax6/dViY25EPyluDAVsc1FuTKywlqdYpHkhfne+/BRtRYY7F7ch2yS04Euekb4T4o8N3tlgL+39RfxGIyWmZ4DUjmhCEcTBbSDqf/hoZNeqGfKiADsZCvP1EC3nZAWBDf3rXDidDVqtr/H2mqxUMj9gF8pg1znEZjD2XthK2k8HqZaA6Qmv7cKT0bNuPsnkBTzhBEt5fsUI4fxh1Kc5NAv0KRsTbO0DncO2JDsqjHPVoXs9WXBv8UDsuMtZRInO',
      PayHeadID: this.state.selectedID,
      PayHead: this.state.selectedHead,
      finacial_start_date: this.state.FY_START,
      finacial_end_date: this.state.FY_END,
      WorkflowID: this.state.workflow_id,
      EnteredClaimAmount: this.state.bill_amt,
      DeclarationAmount: this.state.dcl_amount,
      Remarks: "",
      Billarray: fbparray,
      ClaimDate: this.state._claim_date,
    }),); */
    /* await fetch('http://104.211.160.16:89/api/Addfbp_claim', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'dolB2/eUb7oieUBWAZeazYB4xM1TECH8pS1ohSFFLyt2oan3Di70E1I7AZdpZGKYw5KRYe5Z7yzW9LuN4CEhY3EoOtJvCZs8BqY/nDAVePr3F9Wk6JjMJ0RQMfCXV8qdI/HgzPaN7ezZve0aS+cMsIK1/r7fjX98I3gMeV+zfSRZBJN6DYe3UAEF/QGIkLr3zhs20wLfEC9jS42ZeqNjliLh2spgzOd54TPMYbe1WZM0PIpfU+eFfCFB/QO2T15CB30DaPvpEQNMCpQmxT7xv3XtEspfkNDpt5HnU9cdEec54nMAQK/rYIKRG2/Yqi2TOQm29h8UzDxaLJMhc5jy8+xKEjXKLQWMsihXAAGzp/mIipy0iNzs62s+aRLB5l7ku+KnCOGAYQWrCF97UDg+ezW/j9Ch+95iTJtOip7bbBVCDa6rvRNpi1GyZJ7Te7xdUtBMMc/IxHXIK3ZzbDkedOUNUAhrQOYuPPpKWrjTLz72n3/UPngWMuQXLFQwbvS2wbL/aNFy2xtRTGTHkXSxRLT4lfUFET/is2eN4MU7wgmVrVJ75meNY0lMoZekbYKCOJGI007DnVPBRJcPfHa1tHZuuqcvu30WKyHUHQdIumO7o7cYThaMZHoTXlOyQ25PMUqfd3GTT6TxKLWMLkcK5FWEr+IIwsuUHNYTmGb2Wox5bEKTi+MbXTIzj1nverJFYax6/dViY25EPyluDAVsc1FuTKywlqdYpHkhfne+/BRtRYY7F7ch2yS04Euekb4T4o8N3tlgL+39RfxGIyWmZ4DUjmhCEcTBbSDqf/hoZNeqGfKiADsZCvP1EC3nZAWBDf3rXDidDVqtr/H2mqxUMj9gF8pg1znEZjD2XthK2k8HqZaA6Qmv7cKT0bNuPsnkBTzhBEt5fsUI4fxh1Kc5NAv0KRsTbO0DncO2JDsqjHPVoXs9WXBv8UDsuMtZRInO',
        PayHeadID: this.state.selectedID,
        PayHead: this.state.selectedHead,
        finacial_start_date: this.state.FY_START,
        finacial_end_date: this.state.FY_END,
        WorkflowID: this.state.workflow_id,
        EnteredClaimAmount: this.state.bill_amt,
        DeclarationAmount: this.state.dcl_amount,
        Remarks: "",
        Billarray: fbparray,
        ClaimDate: this.state._claim_date,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        this.setState({
          modalVisible:false,
        });
        alert(response.mesage);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          modalVisible:false,
        });
      }); */
  }

  showDatePicker() {
    this.setState({
      isDatePickerVisible: true,
    });
  }

  hideDatePicker() {
    this.setState({
      isDatePickerVisible: false,
    });
  }

  handleConfirm = date => {
    //console.log('A date has been picked: ', date);
    //alert('A date has been picked: ' + moment(date).format('YYYY-MM-DD'));
    this.setState({
      bill_date: moment(date).format('YYYY-MM-DD'),
    });
    this.hideDatePicker();
  };

  async _file_picker() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      const split = res.uri.split('/');
      const name = split.pop();
      const inbox = split.pop();
      this.setState({
        realPath: res.uri, //RNFS.TemporaryDirectoryPath + '/' + inbox + '/' + name,
        bill_attach: res.name,
        extension: res.name.split('.')[1],
        modalVisible: true,
      });
      setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 60000);
      /* const realPath = RNFS.TemporaryDirectoryPath + '/' + inbox + '/' + name;
      console.log(this.state.realPath); */

      //console.warn('extension--->' + this.state.extension);
      this.ConvertBase64(res.uri, this.state.extension);
      // alert();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  async ConvertBase64(path, extension) {
    //this.setState({bill_desc: path});
    await RNFS.readFile(path, 'base64').then(res => {
      //console.log('base64------------->' + res);
      //this.setState({bill_desc: res});
      this.File_upload(res, extension);
    });
  }
  /* // Pick multiple files
try {
  const results = await DocumentPicker.pickMultiple({
    type: [DocumentPicker.types.images],
  });
  for (const res of results) {
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
  }
} catch (err) {
  if (DocumentPicker.isCancel(err)) {
    // User cancelled the picker, exit any dialogs or menus and move on
  } else {
    throw err;
  }
} */

  _submitbtn() {
    /* this.setState({
      modalVisible: true,
    }); */
    //curdate=moment().format('YYYY-MM-DD 00:00:00');
    this.setState((previousState, currentProps) => {
      return {
        fbp_array: [
          {
            email_id: 'sathishr@aafindia.net',
            BillDesc: previousState.bill_desc,
            BillAmount: previousState.bill_amt,
            BillDate: previousState.bill_date,
            BillAddedDate: moment().format('YYYY-MM-DD 00:00:00'),
            BillNumber: previousState.bill_num,
            BillPath: previousState.bill_s3_path,
          },
        ],
      };
    });

    
    /* this.setState({
        fbp_array: [
          {
            email_id: 'sathishr@aafindia.net',
            BillDesc: bill_desc,
            BillAmount: bill_amt,
            BillDate: bill_date,
            BillAddedDate:curdate,
            BillNumber: bill_num,
            BillPath: bill_s3_path,
          },
        ],
    }); */

    if(this.state.fbp_array.length > 0){
      this.submit_claim(this.state.fbp_array);
      //alert(this.state.fbp_array.toString());
    }
    console.log(this.state.fbp_array);
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
          <View style={styles.headerLayout}></View>
        </LinearGradient>
        <View style={styles.body}>
          <ScrollView>
            <ScrollView></ScrollView>
            <Text style={{color: 'grey', padding: 4}}>Select FBP Head *</Text>
            {
              <Picker
                style={{marginLeft: 4, marginRight: 4}}
                selectedValue={this.state.selectedHead}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState(
                    {
                      selectedHead: this.state.FbpHeadDetails[itemIndex].PayHead,
                      selectedID: this.state.FbpHeadDetails[itemIndex].PayHeadID,
                    },
                    () =>
                      this.fetch_dcl_amt(
                        this.state.FbpHeadDetails[itemIndex].PayHead,
                      ),
                      console.log(this.state.selectedHead,this.state.selectedID)
                  )
                }>
                {this.state.FbpHeadDetails.map((item, key) => (
                  <Picker.Item
                    label={item.PayHead}
                    value={item.PayHeadID}
                    key={key}
                  />
                ))}
              </Picker>
            }
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'grey', padding: 4}}>
                Declaration Amount :
              </Text>
              <Text style={{padding: 4}}>{this.state.dcl_amount}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'grey', padding: 4}}>Claim Date :</Text>
              <Text style={{padding: 4}}>{this.state.claim_date}</Text>
            </View>
            {/*  <View style={{padding: 8}}>
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
                  Actions.NewClaimBottomSheet();
                }}>
                <Text>Add Bill</Text>
              </TouchableOpacity>
            </View> */}
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
                  Bill Information
                </Text>
              </LinearGradient>
              <View>
                {/* <Text style={{padding:4,color:'grey',fontStyle:'italic'}}>No Claim Details Found!</Text> */}
              </View>
              <View style={styles.mainPage}>
                {/* <Text style={{color: '#6484e3'}}>Bill Information</Text>
              <View
                style={{
                  height: 1.5,
                  backgroundColor: '#6484e3',
                  opacity: 0.8,
                }}
              /> */}
                <View>
                  <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
                    Bill Number
                  </Text>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={text => this.setState({bill_num: text})}
                  />
                </View>
                <View>
                  <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
                    Bill Date
                  </Text>
                  <Text
                    style={styles.input}
                    onPress={() => this.showDatePicker()}>
                    {this.state.bill_date}
                  </Text>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
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
                    onChangeText={text => this.setState({bill_amt: text})}
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
                    onChangeText={text => this.setState({bill_desc: text})}
                  />
                </View>
                <View>
                  <Text style={{padding: 4, color: 'grey', opacity: 0.8}}>
                    Bill Attach
                  </Text>
                  <Text
                    style={styles.input}
                    onPress={() => this._file_picker()}>
                    {this.state.bill_attach}
                  </Text>
                  <Image
                    style={{/* height: 50, width: 50} */ flex: 1}}
                    source={{uri: this.state.realPath}}
                  />
                </View>
              </View>
            </View>

            <View style={{padding: 8}}>
              <LinearGradient
                colors={['#6484e3', '#4ac0d1']}
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#fff',
                  borderRadius: 16,
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
                    padding: 4,
                  }}
                  onPress={() => this._submitbtn()}>
                  <Text
                    style={{
                      color: '#fff',
                    }}>
                    Submit Claim
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
        <ProgressDialog modalVisible={this.state.modalVisible} />
      </View>
    );
  }
}
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
  },
  smalltext: {
    fontSize: 12,
    paddingLeft: 4,
    paddingRight: 4,
  },
  input: {
    backgroundColor: 'gainsboro',
    textAlignVertical: 'center',
    paddingLeft: 12,
    height: 38,
    borderRadius: 8,
  },
});
export default NewClaim /* bottomsheet */;
