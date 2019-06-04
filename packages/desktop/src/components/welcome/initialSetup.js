import React from 'react';
import { connect } from 'react-redux';
import { InitialSetup } from '@emeraldwallet/ui';
import { TERMS_VERSION } from '../../store/config';
import launcher from '../../store/launcher';
import Wallet from '../../store/wallet';
import { switchEndpoint } from '../../store/wallet/walletActions';
import { saveSettings, setChain } from '../../store/launcher/launcherActions';
import { api } from '../../lib/rpc/api';

export default connect(
  (state, ownProps) => ({
    currentTermsVersion: TERMS_VERSION,
    terms: state.launcher.get('terms'),
  }),
  (dispatch, ownProps) => ({
    onTermsAgreed: () => dispatch(launcher.actions.agreeOnTerms(TERMS_VERSION)),
    connectETC: () => {
      api.updateChain('mainnet');
      dispatch(setChain('mainnet', 61));
      dispatch(saveSettings({}));
      dispatch(switchEndpoint({chain: 'mainnet', chainId: 61}));
      dispatch(Wallet.actions.onOpenWallet());
    },
    connectETH: () => {
      api.updateChain('eth');
      dispatch(setChain('eth', 1));
      dispatch(saveSettings({}));
      dispatch(switchEndpoint({chain: 'eth', chainId: 1}));
      dispatch(Wallet.actions.onOpenWallet());
    },
  })
)(InitialSetup);