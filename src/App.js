import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as JSZip from 'jszip';
axios.get(
    "https://hichculturedmm.s3.ap-southeast-1.amazonaws.com/formData.zip",
    { 
      headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET',
      },
      responseType: "blob" 
    })
    .then((response) => {

        let zip = new JSZip();
        zip.loadAsync(response.data).then((value) => {
            console.log('jszip unzipped response.data');
            value.forEach((path, file) => {
                console.log(path);
            })
        }).catch((e) => {
            console.log(`jszip failed on response.data: ${e}`);
        })

        let buffer = Buffer.from(response.data, 'binary');
        zip.loadAsync(buffer).then((value) => {
            console.log('jszip unzipped buffer');
            value.forEach((path, file) => {
                console.log(path);
            })
        }).catch((e) => {
            console.log(`jszip failed on buffer: ${e}`);
        })

    }).catch((reason) => {
        console.log(`axios request failed: ${reason}`);
    })

function App() {
  return (
    <>
    
    </>
  );
}

export default App;
