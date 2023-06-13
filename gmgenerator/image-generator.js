const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

generateBtn.addEventListener('click', generateImage);
downloadBtn.addEventListener('click', downloadImage);

function getRandomImage(layer) {
    const index = Math.floor(Math.random() * 5) + 1; // assumes 5 images per layer, adjust as needed
    return fetch(`assets/${layer}/layer${layer}-${index}.png`) // adjust the path as needed
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob));
}

async function generateImage() {
    const [img1, img2, img3] = await Promise.all([
        getRandomImage(1),
        getRandomImage(2),
        getRandomImage(3),
    ]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(img2, 0, 0);
    ctx.drawImage(img3, 0, 0);
}

function downloadImage() {
    const a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = 'image.png';
    a.click();
}
