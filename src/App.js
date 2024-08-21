import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, TextField } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import bg from './login.png'; // Ensure this path is correct and the image is inside the src directory

function App() {
  const [url, setUrl] = useState('');
  const [size, setSize] = useState(300);

  const downloadImag = (url) => {
    const img = document.createElement('a');
    img.href = document.getElementById('canvas').toDataURL();
    img.download = 'qrcode.png';
    img.click();
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-lg shadow-lg overflow-hidden items-center">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-10 2xl:p-56">
          <p className="mt-2 text-sm font-black sm:text-lg text-gray-600 mb-5">Your Website Created By Anurag ⭐</p>
          <h2 className="text-2xl font-black text-gray-900 sm:text-4xl mb-3 lg:mb-5">
            Link To QR Code Generator
          </h2>
          <TextField id="outlined-basic" type={URL} className="my-4" label="Enter URL" variant="outlined" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        {/* Right Side - Image */}
        <div
          className="w-full md:w-1/2 h-full bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className='p-6'>
            <QRCodeCanvas id='canvas' className="mx-auto" value={url} size={size} renderAs="canvas" />
          </div>
          <div className='mt-5'>
            <Button onClick={downloadImag} variant="contained" className="flex mt-5 mx-auto " endIcon={<DownloadIcon />}>
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;