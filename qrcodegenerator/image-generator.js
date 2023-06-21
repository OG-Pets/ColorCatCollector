var qr;

function generateQRCode() {
    var url = document.getElementById('url').value;

    // Check if the URL is empty
    if (!url) {
        alert('Please enter a URL.');
        return;
    }

    // Clear the container
    document.getElementById('qrcode').innerHTML = "";

    // Try to generate the QR code
    try {
        qr = new QRCodeStyling({
            width: 300,
            height: 300,
            data: url,
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            dotsOptions: {
                color: "#4267b2",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#e9ebee",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 20
            }
        });
        qr.append(document.getElementById("qrcode"));
    } catch (error) {
        console.error('Failed to generate QR code:', error);
    }
}

function downloadQRCode() {
    // Check if the QR code has been generated
    if (!qr) {
        alert('Please generate a QR code first.');
        return;
    }

    var link = document.createElement('a');
    link.download = 'QRCode.png';
    link.href = document.querySelector('#qrcode canvas').toDataURL();
    link.click();
}
