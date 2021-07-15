import * as cfddlcjs from "../../index.js";
import TestHelper from "./TestHelper";
import * as TestData from "./data/TestData";

const testCase = [
  TestHelper.createTestCase(
    "CreateCetAdaptorSignatures",
    cfddlcjs.CreateCetAdaptorSignatures,
    {
      cetsHex: [
        TestData.CetHexUnsigned,
        "0200000001e8b791f27c983a7d9b0ee9b010b12563911ced584d88eb105fcece8b0bd18cff0000000000ffffffff02a0860100000000001600145dedfbf9ea599dd4e3ca6a80b333c472fd0b3f69603bea0b000000001600149652d86bedf43ad264362e6e6eba6eb76450812700000000",
      ],
      privkey: TestData.LocalFundPrivkey,
      localFundPubkey: TestData.LocalFundPubkey,
      remoteFundPubkey: TestData.RemoteFundPubkey,
      fundTxId: TestData.FundTxId,
      fundVout: 0,
      fundInputAmount: TestData.FundInputAmount,
      oraclePubkey: TestData.OraclePubkey,
      oracleRValues: [TestData.OracleRPoint],
      messagesList: [
        { messages: [TestData.Messages[0]] },
        { messages: [TestData.Messages[1]] },
      ],
    },
    {
      adaptorPairs: [
        {
          signature: TestData.CetLocalAdaptorSignature,
          proof: TestData.CetLocalAdaptorProof,
        },
        {
          signature:
            "00a9930a1c6cb1ac9b9e7b7e9e9e4f61daff657f3c34e48f8528fd96bf4f1c02fce82dc56d79b69f589db75773c0aea4252ee66a6d9c3db512b87309709fb19bca",
          proof:
            "0033ed46b1824febb1a9c27f6ee5815aea8cfbb1a1ce41135a85d1cbdaf3f45711ae6fd1bd328c958c0676ae083c7dfcf12505170d482a8a3b1dd5e7562da302fd19b60b30276db0fdac69a95207b22cb0bd9dcc319c9924bb2dc7c2633f4b452e",
        },
      ],
    }
  ),
  TestHelper.createTestCase(
    "CreateCetAdaptorSignatures Multiple Nonces",
    cfddlcjs.CreateCetAdaptorSignatures,
    {
      cetsHex: [
        TestData.CetHexUnsigned,
        "0200000001e8b791f27c983a7d9b0ee9b010b12563911ced584d88eb105fcece8b0bd18cff0000000000ffffffff02a0860100000000001600145dedfbf9ea599dd4e3ca6a80b333c472fd0b3f69603bea0b000000001600149652d86bedf43ad264362e6e6eba6eb76450812700000000",
      ],
      privkey: TestData.LocalFundPrivkey,
      localFundPubkey: TestData.LocalFundPubkey,
      remoteFundPubkey: TestData.RemoteFundPubkey,
      fundTxId: TestData.FundTxId,
      fundVout: 0,
      fundInputAmount: TestData.FundInputAmount,
      oraclePubkey: TestData.OraclePubkey,
      oracleRValues: [TestData.OracleRPoint],
      messagesList: [
        { messages: [TestData.Messages[0]] },
        { messages: [TestData.Messages[1]] },
      ],
    },
    {
      adaptorPairs: [
        {
          signature: TestData.CetLocalAdaptorSignature,
          proof: TestData.CetLocalAdaptorProof,
        },
        {
          signature:
            "00a9930a1c6cb1ac9b9e7b7e9e9e4f61daff657f3c34e48f8528fd96bf4f1c02fce82dc56d79b69f589db75773c0aea4252ee66a6d9c3db512b87309709fb19bca",
          proof:
            "0033ed46b1824febb1a9c27f6ee5815aea8cfbb1a1ce41135a85d1cbdaf3f45711ae6fd1bd328c958c0676ae083c7dfcf12505170d482a8a3b1dd5e7562da302fd19b60b30276db0fdac69a95207b22cb0bd9dcc319c9924bb2dc7c2633f4b452e",
        },
      ],
    }
  ),
];

TestHelper.doTest("GetRawCetSignatures", testCase);
