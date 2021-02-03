import * as cfdjs from "cfd-js";
import * as cfddlcjs from "../../index.js";
import * as TestData from "./data/TestData";

function generateSchnorrKeyPair(): { privkey: string, pubkey: string } {
  const privkey = cfdjs.CreateKeyPair({ wif: false }).privkey;
  const pubkey = cfdjs.GetSchnorrPubkeyFromPrivkey({ privkey }).pubkey;
  return { privkey, pubkey };

}

interface PrivateOracleInfo {
  privkey: string,
  privnonces: string[],
  pubkey: string,
  nonces: string[]
}

function generateOracleInfo(nbNonces: number): PrivateOracleInfo {
  const { privkey, pubkey } = generateSchnorrKeyPair();
  const privnonces = [];
  const nonces = [];
  for (let i = 0; i < nbNonces; i++) {
    const keypair = generateSchnorrKeyPair();
    privnonces.push(keypair.privkey);
    nonces.push(keypair.pubkey);
  }

  return { privkey, privnonces, pubkey, nonces };
}

test("MultiOracleAdaptorSig", () => {
  const nbOracles = 4;
  const nbMessages = 20;
  const oraclePrivInfos = [];
  const oracleInfos : cfddlcjs.OracleInfo[] = [];
  const sigs = [];
  for (let i = 0; i < nbOracles; i++) {
    const oraclePrivInfo = generateOracleInfo(nbMessages);
    const msgs = [];
    for (let j = 0; j < nbMessages; j++) {
      const msg = `${i}${j}`;
      msgs.push(msg);
      sigs.push(cfdjs.SchnorrSign({
        privkey: oraclePrivInfo.privkey,
        message: msg,
        nonceOrAux: oraclePrivInfo.privnonces[j],
        isHashed: false,
        isNonce: true,
      }).hex);
    }
    oracleInfos.push({
      oraclePubkey: oraclePrivInfo.pubkey,
      oracleRValues: oraclePrivInfo.nonces,
      messages: msgs
    });
    oraclePrivInfos.push(oraclePrivInfo);
  }

  const adaptorPair = cfddlcjs.CreateCetAdaptorSignatureMultiOracle({
    cetHex: TestData.CetHexUnsigned,
    privkey: TestData.LocalFundPrivkey,
    fundTxId: TestData.FundTxId,
    fundVout: 0,
    fundInputAmount: TestData.FundInputAmount,
    oracleInfos,
    localFundPubkey: TestData.LocalFundPubkey,
    remoteFundPubkey: TestData.RemoteFundPubkey,
  });

  const isValid = cfddlcjs.VerifyCetAdaptorSignatureMultiOracle({
    cetHex: TestData.CetHexUnsigned,
    adaptorSignature: adaptorPair.signature,
    adaptorProof: adaptorPair.proof,
    oracleInfos,
    fundTxId: TestData.FundTxId,
    fundVout: 0,
    fundInputAmount: TestData.FundInputAmount,
    localFundPubkey: TestData.LocalFundPubkey,
    remoteFundPubkey: TestData.RemoteFundPubkey,
    verifyRemote: false,
  });

  expect(isValid).toBeTruthy();

  const signedCet = cfddlcjs.SignCet({
    cetHex: TestData.CetHexUnsigned,
    fundTxId: TestData.FundTxId,
    fundVout: 0,
    fundInputAmount: TestData.FundInputAmount,
    localFundPubkey: TestData.LocalFundPubkey,
    remoteFundPubkey: TestData.RemoteFundPubkey,
    adaptorSignature: adaptorPair.signature,
    fundPrivkey: TestData.RemoteFundPrivkey,
    oracleSignatures: sigs,
  }).hex;


  const valid = cfdjs.VerifySign({
    tx: signedCet,
    txins: [{
      txid: TestData.FundTxId,
      vout: 0,
      address: "",
      amount: TestData.FundInputAmount,
    }]
  }).success;

  expect(valid).toBeTruthy();
})
