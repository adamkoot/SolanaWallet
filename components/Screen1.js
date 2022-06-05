import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
} from '@solana/web3.js';

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: null,
      balance: null,
    };
  }

  connection = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    return connection;
  };

  balance = async () => {
    const connection = await this.connection();
    console.log(connection);

    let base58publicKey = new PublicKey(this.state.publicKey);
    console.log(base58publicKey.toBase58());

    let balance = await connection.getBalance(base58publicKey);
    this.setState({balance: balance / LAMPORTS_PER_SOL});
  };

  airdrop = async () => {
    const connection = await this.connection();
    let base58publicKey = new PublicKey(this.state.publicKey);

    const airdropSignature = await connection.requestAirdrop(
      base58publicKey,
      LAMPORTS_PER_SOL,
    );

    const signature = await connection.confirmTransaction(airdropSignature);

    await this.balance();

    ToastAndroid.showWithGravity(
      'You are richer! ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  createWallet = async () => {
    const keypair = Keypair.generate();
    console.log(keypair.publicKey);

    this.setState({
      publicKey: keypair.publicKey.toString(),
    });

    console.log(this.state.publicKey);
    ToastAndroid.showWithGravity(
      'Account created! ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    await this.balance();
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.block}>
          <Text style={{fontSize: 25}}>You don not have wallet?</Text>
          <Text style={{fontSize: 30}}>Let's create!</Text>
        </View>

        <View style={styles.button}>
          <Button
            onPress={this.createWallet}
            title="CREATE WALLET"
            color="#841584"
          />
        </View>

        {this.state.publicKey != null ? (
          <View>
            <View style={styles.block}>
              <Text>Public key:</Text>
              <Text>{this.state.publicKey}</Text>
            </View>
            <View style={styles.block}>
              <Text>Balance:</Text>
              <Text>{this.state.balance}</Text>
            </View>
            <View style={styles.block}>
              <Button title="AIRDROP" color="#841584" onPress={this.airdrop} />
            </View>
          </View>
        ) : (
          <Text>what are you waiting for?^</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwd: {
    width: 100,
    backgroundColor: '#841284',
    borderWidth: 2,
    borderRadius: 3,
    color: 'white',
    textAlign: 'center',
  },
  block: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
  },
});
