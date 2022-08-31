var fs = require('fs');
const util = require('util');
// npm install --save ethers
const { ethers } = require("ethers");

const POPADDRESS="0x2f46E37477Ca4033D74986b15F0572e9913B4858";
const POPABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[{"internalType":"uint256","name":"_size","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"}],"name":"InvalidCodeAtRange","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"WriteError","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"mimetype","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bool","name":"useExistingData","type":"bool"},{"internalType":"uint256","name":"existingDataIndex","type":"uint256"}],"internalType":"struct Indelible.TraitDTO[]","name":"traits","type":"tuple[]"}],"name":"addLayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"mimetype","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bool","name":"useExistingData","type":"bool"},{"internalType":"uint256","name":"existingDataIndex","type":"uint256"}],"internalType":"struct Indelible.TraitDTO","name":"trait","type":"tuple"}],"name":"addTrait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"allowListPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractData","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"banner","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"uint256","name":"royalties","type":"uint256"},{"internalType":"string","name":"royaltiesRecipient","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"}],"name":"getLinkedTraits","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_hash","type":"string"}],"name":"hashToMetadata","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_hash","type":"string"}],"name":"hashToSVG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAllowListActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isContractSealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isMintActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPublicMintActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPerAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPerAllowList","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"onAllowList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenIdA","type":"uint256"},{"internalType":"uint256","name":"tokenIdB","type":"uint256"}],"name":"reRollDuplicate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sealContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allowListPrice","type":"uint256"}],"name":"setAllowListPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_backgroundColor","type":"string"}],"name":"setBackgroundColor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"banner","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"uint256","name":"royalties","type":"uint256"},{"internalType":"string","name":"royaltiesRecipient","type":"string"}],"internalType":"struct Indelible.ContractData","name":"_contractData","type":"tuple"}],"name":"setContractData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256[]","name":"traitA","type":"uint256[]"},{"internalType":"uint256[]","name":"traitB","type":"uint256[]"}],"internalType":"struct Indelible.LinkedTraitDTO[]","name":"linkedTraits","type":"tuple[]"}],"name":"setLinkedTraits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxPerAddress","type":"uint256"}],"name":"setMaxPerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxPerAllowList","type":"uint256"}],"name":"setMaxPerAllowList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"newMerkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bool","name":"_renderOffChain","type":"bool"}],"name":"setRenderOfTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleAllowListMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"togglePublicMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleWrapSVG","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenIdToHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenIdToSVG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenIdA","type":"uint256"},{"internalType":"uint256","name":"tokenIdB","type":"uint256"}],"name":"tokensAreDuplicates","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"}],"name":"traitData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"}],"name":"traitDetails","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"mimetype","type":"string"}],"internalType":"struct Indelible.Trait","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];


// Contract deployment 0xed0555bf0420aab38d62065f1cafdbce032528189a7483b2b8a95201f92734b3
let ADDLAYERTXHASHES = [
  // "0xbf31c60e00e9edcc9523dd5745f2cb2862387a20fa892b810ff0496b4a93f887", // #0
  // "0xf5978752cb1898c90976def3eb1d50d47b8b62b11fd09eb92094568e431372a3", // #1
  // "0x0bf81c35b440b44c6f6f1d4b6dc72fe2bea93d7904ec793bd1fcecd527c97e6f", // #2
  // "0x3879eb124e74c048fb80d964a0df9c8fe2ee5ec56c585c5fb6b99c48adc0ee9e", // #3
  // "0x1256ef027223fd7d06024d59b0d741d2c633cb1c2fc9dc06bbc322ceac2231af", // #4
  // "0xb29d6c3349853a5e495a60ad169a24d4f342c6449e633cb801bb29b3126b1de9", // #5
  // "0x8db2e90478f87f166fa9f5b1d80d03724840718e97e223b20f66263838a3b570", // #6
  // "0x252a42680723e2d03891b940de66f6365be4d7626433a1334abd9a18a73d2980", // #7
  "0x48cd7e8fc4e773766e0efab4a274a814239444a325e6c08ec33197b3bdf7eb57", // #8
  // "0x3a679b00a860d4eb01045ef0f5a13255a62da7c47ef712ea3372daf729eea8a5", // #9
  // "0xe979b098b6585cc1a852bb06e5e3ba532a527e10b66f74a974630a0e4bc19274", // #10
  // // "0xeeffad25986aa9d00a7d12fe345237e441de89559287289d6691335b86ab9e8e", // Set Linked Traits
];
// DEBUG
// ADDLAYERTXHASHES = [
//   "0x48cd7e8fc4e773766e0efab4a274a814239444a325e6c08ec33197b3bdf7eb57", // #8
// ];

const LAYERNAMES = ["Legendaries", "Mouth", "Eyewear", "Nose", "Headwear", "Eyes", "Clothing", "Lips", "Body", "Skill", "Background"];


async function getTokens() {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()
  const blockNumber = await provider.getBlockNumber();
  const pop = new ethers.Contract(POPADDRESS, POPABI, provider);
  const totalSupply = await pop.totalSupply();
  // console.log("totalSupply: " + totalSupply);
  const data = {};
  console.log("tokenId\thash\tbodyIndex\tSVG");
  for (let tokenId = 0; tokenId < totalSupply && tokenId < 10; tokenId++) {
    const hash = await pop.tokenIdToHash(tokenId);
    const svg = await pop.hashToSVG(hash);
    const bodyIndex = hash.slice(8 * 3, 8 * 3 + 3);
    console.log(tokenId + "\t" + hash + "\t" + bodyIndex + "\t" + svg.slice(0, 20));
    if (!(bodyIndex in data)) {
      data[bodyIndex] = [];
    }
    data[bodyIndex].push({ tokenId, hash, bodyIndex, svg })
  }

  // console.log(JSON.stringify(data));
  for (const bodyIndex of Object.keys(data).sort()) {
    const tokens = data[bodyIndex];
    // console.log("bodyIndex: " + bodyIndex + " " + JSON.stringify(tokens));
  }

  // console.log(JSON.stringify(data, null, 2));
  return data;
}


async function getBodies() {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()
  const blockNumber = await provider.getBlockNumber();
  const mff = new ethers.Contract(POPADDRESS, POPABI, provider);

  const tokens = await getTokens();
  console.log("tokens: " + tokens);

  const data = [];
  for (const txHash of ADDLAYERTXHASHES) {
    const tx = await provider.getTransaction(txHash);
    const txReceipt = await provider.getTransactionReceipt(txHash);
    const block = await provider.getBlock(txReceipt.blockNumber);
    let decodedData = mff.interface.parseTransaction({ data: tx.data, value: tx.value });
    data.push({ tx, txReceipt, decodedData });
  }

  // for (const item of data) {
  //   console.log(item.tx.data);
  // }

  // console.log("txHash\tlayer\ttuple#\tname\tmimeType\tdata");
  for (const item of data) {
    let tupleIndex = 0;
    for (const tuple of item.decodedData.args[1]) {
      // console.log(item.tx.hash + "\t" + item.decodedData.args[0] + "\t" + tupleIndex + "\t" + tuple[0] + "\t" + tuple[1] + "\t" + tuple[2].substring(0, 10) + "\t" + tuple[3] + "\t" + tuple[4]);
      const name = tuple[0].toLowerCase().replace(/['\/ @]/g, '');
      let buffer = Buffer.from(tuple[2].substring(2), "hex");
      const layer = item.decodedData.args[0];
      const trait = tupleIndex.toString().padStart(3, '0');
      console.log('\n#### Layer ' + layer + ' ' + LAYERNAMES[layer] + ' Trait ' + trait + ' ' + tuple[0]);
      let filename = "svgs/layer" + layer + "-trait" + trait + "-" + name + ".svg";
      console.log('<kbd><img src="scripts/' + filename + '" width="300px" height="300px" /></kbd>');
      console.log('<br />')

      const tokenList = tokens[trait];
      if (tokenList) {
        for (const token of tokenList) {
          filename = "svgs/pop_" + token.tokenId.toString().padStart(4, '0') + ".svg";
          console.log('#' + token.tokenId + '<kbd><img src="scripts/' + filename + '" width="100px" height="100px" /></kbd>');
          const base64data = token.svg.replace(/^.*base64,/, '');
          const data = Buffer.from(base64data, "base64");
          fs.writeFile(filename, data, (err) => {
            if (err) return console.error(err);
            // console.log("File successfully written !");
          });
        }
      }

      tupleIndex++;
    }
  }
}

getBodies();

// console.log(process.cwd());
