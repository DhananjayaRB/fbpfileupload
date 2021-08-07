import React from 'react';
import {color} from 'react-native-reanimated';
import {Router, Scene} from 'react-native-router-flux';
import FbpClaim from './FbpClaim.js';
import NewClaim from './NewClaim';
import NewClaimBottomSheet from './NewClaimBottomSheet';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="home"
        titleStyle={{color: 'transparent'}}
        navTransparent={true}
        component={FbpClaim}
        initial={true}
      />
      <Scene
        key="newclaim"
        backButtonTintColor={'white'}
        titleStyle={{color: 'transparent'}}
        navTransparent={true}
        back={true}
        component={NewClaim}
        title=""
      />
      <Scene
        key="NewClaimBottomSheet"
        backButtonTintColor={'white'}
        titleStyle={{color: 'transparent'}}
        navTransparent={true}
        back={true}
        component={NewClaimBottomSheet}
        title=""
      />
    </Scene>
  </Router>
);
export default Routes;
