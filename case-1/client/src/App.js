import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';
import Header from "./components/Header";


function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider=async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });
      
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        });


        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        // This will be changed if the contract is redeployed

        let contractAddress = "0xff6Db98437b74365ab7f97DBf1e351D0B84E75cF";

        const contract = new ethers.Contract(
          contractAddress,Upload.abi,signer
        )
        // // 
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else
      {
        console.error("Metamask is not Installed! Make sure you download it first ...");
      }
    };
    provider && loadProvider()
  },[]);
  return (
    <>
  <div className="bg"></div>
  <div className="bg-bg2"></div>
  <div className="bg-bg3"></div>

<div className="topHeading">

    {!modalOpen && (
      <button id = "Sharebtn" className="share btn btn-dark" onClick={() => setModalOpen(true)}>
        Share
      </button>
    )}
    {modalOpen && (
      <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
    )}
{/* <br/> */}
      <p id= "AccountNum">Account : {account ? account: "Account Not connected"}</p>
</div>

<br/><br/><br/><br/>

        <Header></Header>

    <div className="App">
      <div className="headUpload">
      <h1 id = "header_file_upload"> File-Upload</h1> 
      </div>
      <FileUpload account={account} provider = {provider} contract={contract}></FileUpload><br /> 
      <Display contract = {contract} account = {account}></Display>
    </div>


    </>
  );
}

export default App;
