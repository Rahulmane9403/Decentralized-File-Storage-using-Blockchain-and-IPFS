import React from 'react'
import { useState } from 'react'
import "./Display.css";
import FileUpload from './FileUpload';
export default function Display({contract,account}) {
    const[data,setData] = useState("")
    const getdata = async()=>{
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        if(Otheraddress)
        {
            dataArray=await contract.display(Otheraddress);
            console.log(dataArray);
        }
        else
        {
            dataArray = await contract.display(account);
        }
        const isEmpty = Object.keys(dataArray).length===0;

        if(!isEmpty)
        {
            const str = dataArray.toString();
            const str_array  = str.split(",");
            const images = str_array.map((item,i) =>{
                return(
                    <>
                    <a href={item} key = {i}  target = "_blank" download></a>

                    <table id = "customers">
                    <tbody>
                        <tr>
                            <td>{item}</td>
                            <td> <a href = {`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} target="_blank">View File</a> </td>
                    </tr>
                    </tbody>
                    </table>
                    </>
                )   
            })
            setData(images);
        }
        else
        {
            alert("No file to Display");
        }
    }
  return (
    <>
    <div>
        <div className="image-list">{data}</div>
        <input type="text" placeholder='Enter Address' className='address' />
        <button type="button" className="getBtn" onClick={getdata}>Get Data</button>
    </div>
    </>
  )
}
