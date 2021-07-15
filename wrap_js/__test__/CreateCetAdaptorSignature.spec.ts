import * as cfddlcjs from "../../index.js";
import TestHelper from "./TestHelper";
import * as TestData from "./data/TestData";

const testCase = [
  TestHelper.createTestCase(
    "CreateCetAdaptorSignature",
    cfddlcjs.CreateCetAdaptorSignature,
    {
      cetHex: TestData.CetHexUnsigned,
      privkey: TestData.LocalFundPrivkey,
      localFundPubkey: TestData.LocalFundPubkey,
      remoteFundPubkey: TestData.RemoteFundPubkey,
      fundTxId: TestData.FundTxId,
      fundVout: 0,
      fundInputAmount: TestData.FundInputAmount,
      oraclePubkey: TestData.OraclePubkey,
      oracleRValues: [TestData.OracleRPoint],
      messages: [TestData.Messages[0]],
    },
    {
      signature: TestData.CetLocalAdaptorSignature,
      proof: TestData.CetLocalAdaptorProof,
    }
  ),
  TestHelper.createTestCase(
    "CreateCetAdaptorSignature Multiple Nonces",
    cfddlcjs.CreateCetAdaptorSignature,
    {
      cetHex: TestData.CetHexUnsigned,
      privkey: TestData.LocalFundPrivkey,
      localFundPubkey: TestData.LocalFundPubkey,
      remoteFundPubkey: TestData.RemoteFundPubkey,
      fundTxId: TestData.FundTxId,
      fundVout: 0,
      fundInputAmount: TestData.FundInputAmount,
      oraclePubkey: TestData.OraclePubkey,
      oracleRValues: [
        TestData.OracleRPoint,
        "7fb1cbb510efe5eb03b5381dafbe82db8e751bb546a3e203aabe7ebbc9d441c4",
      ],
      messages: [TestData.WinMessage, "MORE"],
    },
    {
      signature:
        "00256c7062738639265d8ac2fdf8a23599af7a2ad6490062936a0af02939409995551208de29ceb4afac2b747aacd115989cf237bdc666e68fc0e751a9c3d3bdab",
      proof:
        "00f82aa0cd0a079e357bb2b35a06af406bceb767cfe51e28c60ad594d35085cc2565d5b2ba0e355bfe40d6de7f7383e98f34df262007b98be60739875061029c976580c28ef150ef37691c3ddc2d69f7973257311ec0700cb5f1b3a3aaa160f63f",
    }
  ),
];

TestHelper.doTest("GetRawCetSignature", testCase);
