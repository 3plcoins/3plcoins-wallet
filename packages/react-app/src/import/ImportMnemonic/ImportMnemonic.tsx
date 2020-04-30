import { BlockchainCode, IBlockchain, Logger } from '@emeraldwallet/core';
import { accounts, IState, screen, settings } from '@emeraldwallet/store';
import { ImportMnemonic } from '@emeraldwallet/ui';
import * as React from 'react';
import { connect } from 'react-redux';

const logger = Logger.forCategory('ImportMnemonic');

export interface IOwnProps {
  mnemonic?: string;
}

interface IStateProps {
  blockchains: IBlockchain[];
  error?: any;
  invalid?: any;
  mnemonic?: string;
  initialValues: {
    hdpath: string
  };
}

interface IDispatchProps {
  onSubmit?: any;
  onBack?: any;
}

export default connect<IStateProps, IDispatchProps, IOwnProps, IState>(
  (state: IState, ownProps): IStateProps => ({
    mnemonic: ownProps.mnemonic,
    initialValues: {
      hdpath: "m/44'/60'/0'/0/0"
    },
    blockchains: settings.selectors.currentChains(state)
  }),
  (dispatch, ownProps) => ({
    onSubmit: (data: {blockchain: BlockchainCode, password: string, mnemonic: string, hdpath: string}) => {
      return dispatch(accounts.actions.importMnemonic(data.blockchain, data.password, data.mnemonic, data.hdpath, '') as any)
        .then((result: any) => {
          if (result.error) {
            throw new Error(result.error.toString());
          } else {
            // show page with wallet details
            dispatch(screen.actions.gotoScreen(screen.Pages.WALLET, result.walletId));
          }
        }).catch((error: any) => {
          logger.error('Error import mnemonic', error);
          throw new Error(error.toString());
        });
    },

    onBack: () => {
      dispatch(screen.actions.gotoScreen(screen.Pages.HOME));
    }
  })
)(ImportMnemonic);
