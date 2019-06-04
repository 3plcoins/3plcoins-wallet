import React from 'react';
import { connect } from 'react-redux';
import screen from 'store/wallet/screen';
import accounts from 'store/vault/accounts';
import Immutable from 'immutable';
import { ImportMnemonic } from '@emeraldwallet/ui';

export default connect(
  (state, ownProps) => ({
    initialValues: {
      mnemonic: ownProps.mnemonic,
      hdpath: "m/44'/60'/160720'/0'",
    },
  }),
  (dispatch, ownProps) => ({
    onSubmit: (data) => {
      return dispatch(accounts.actions.importMnemonic(data.password, data.mnemonic, data.hdpath, '', ''))
        .then((result) => {
          if (result.error) {
            throw new Error(result.error.toString());
          } else {
            // show page with account details
            dispatch(screen.actions.gotoScreen('account', Immutable.fromJS({id: result})));
          }
        }).catch((error) => {
          console.error(error);
          throw new Error(error.toString());
        });
    },

    onBack: () => {
      dispatch(screen.actions.gotoScreen('home'));
    },
  })
)(ImportMnemonic);