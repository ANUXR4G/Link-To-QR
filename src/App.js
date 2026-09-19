import { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, TextField } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import bg from './login.png';

const QR_SIZE = 300;
const LOGO_MAX = Math.round(QR_SIZE * 0.2); // ~20% of QR — readable & scannable

function fitLogoSize(naturalWidth, naturalHeight, maxSize) {
  if (!naturalWidth || !naturalHeight) {
    return { width: maxSize, height: maxSize };
  }

  const ratio = naturalWidth / naturalHeight;

  if (ratio >= 1) {
    return {
      width: maxSize,
      height: Math.max(1, Math.round(maxSize / ratio)),
    };
  }

  return {
    width: Math.max(1, Math.round(maxSize * ratio)),
    height: maxSize,
  };
}

function App() {
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoDims, setLogoDims] = useState({ width: LOGO_MAX, height: LOGO_MAX });

  useEffect(() => {
    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [logo]);

  useEffect(() => {
    if (!logo) {
      setLogoDims({ width: LOGO_MAX, height: LOGO_MAX });
      return;
    }

    const img = new Image();
    img.onload = () => {
      setLogoDims(fitLogoSize(img.naturalWidth, img.naturalHeight, LOGO_MAX));
    };
    img.src = logo;
  }, [logo]);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    if (logo) URL.revokeObjectURL(logo);
    setLogo(URL.createObjectURL(file));
    e.target.value = '';
  };

  const removeLogo = () => {
    if (logo) URL.revokeObjectURL(logo);
    setLogo(null);
  };

  const downloadImag = () => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const img = document.createElement('a');
    img.href = canvas.toDataURL('image/png');
    img.download = 'qrcode.png';
    img.click();
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-lg shadow-lg overflow-hidden items-center">
        <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-10 2xl:p-56">
          <p className="mt-2 text-sm font-black sm:text-lg text-gray-600 mb-5">Your Website Created By Anurag ⭐</p>
          <h2 className="text-2xl font-black text-gray-900 sm:text-4xl mb-3">
            Link To QR Code Generator
          </h2>
          <p className="mb-5 text-sm sm:text-base text-gray-600">
            Lifetime QR codes — your link is built into the image forever. No expiry, no account, no tracking.
          </p>
          <TextField
            id="outlined-basic"
            type="url"
            className="my-4"
            label="Enter URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
              Upload Logo
              <input hidden accept="image/*" type="file" onChange={handleLogoUpload} />
            </Button>
            {logo && (
              <>
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-10 w-10 rounded object-contain border border-gray-200 bg-white"
                />
                <Button
                  variant="text"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={removeLogo}
                >
                  Remove
                </Button>
              </>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Optional — your logo will appear in the center of the QR code.
          </p>
        </div>

        <div
          className="w-full md:w-1/2 h-full bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="p-6 bg-white/90 rounded-lg">
            <QRCodeCanvas
              id="canvas"
              className="mx-auto block"
              value={url || ' '}
              size={QR_SIZE}
              level="H"
              includeMargin
              style={{ width: QR_SIZE, height: QR_SIZE }}
              imageSettings={
                logo
                  ? {
                      src: logo,
                      width: logoDims.width,
                      height: logoDims.height,
                      excavate: true,
                    }
                  : undefined
              }
            />
          </div>
          <div className="mt-5">
            <Button
              onClick={downloadImag}
              variant="contained"
              className="flex mt-5 mx-auto"
              endIcon={<DownloadIcon />}
              disabled={!url}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
