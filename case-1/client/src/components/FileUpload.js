import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      // console.log(file);  
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `a8e7ecb5cca91ab0e210`,
            pinata_secret_api_key: `503ac41280e04483cbe9e4e6901da630c8a9623443e3dc9e04d9558c7236adc0`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImgHash);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object

    // console.log(data);

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="images" className="drop-container">
        <span class="drop-title">Drop files here</span>
          Choose File
        <input
          disabled={!account}
          type="file"
          id="images"
          name="data"
          onChange={retrieveFile}
          />
          </label>  

        <span id = "upFileArea"className="textArea">File: {fileName}</span>
        <button type="submit" className="btn btn-primary" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;