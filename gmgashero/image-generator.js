const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

let layerMetadata = {};

// Load and draw the default image as soon as the page loads
async function loadDefaultImage() {
    const response = await fetch('assets/placeholder.png');
    if (!response.ok) throw new Error('Default image not found');
    const blob = await response.blob();
    const img = await createImageBitmap(blob);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
}


window.addEventListener('load', async () => {
    await fetchLayerMetadata();
    loadDefaultImage();
});
generateBtn.addEventListener('click', generateOrPickImage);
downloadBtn.addEventListener('click', downloadImage);

async function fetchLayerMetadata() {
    const response = await fetch('metadata.json');
    layerMetadata = await response.json();
}

function getRandomImage(layer) {
    const maxIndex = layerMetadata[layer];
    const index = Math.floor(Math.random() * maxIndex) + 1;
    return fetch(`assets/${layer}/layer${layer}-${index}.png`)
        .then(response => {
            if (!response.ok) throw new Error('Image not found');
            return response.blob();
        })
        .then(blob => createImageBitmap(blob));
}

function getRandomPreGeneratedImage() {
    const index = Math.floor(Math.random() * 1) + 1;
    return fetch(`assets/4/image${index}.png`)
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob));
}

async function generateImage() {
    const [img1, img2, img3, img4] = await Promise.all([
        getRandomImage(1),
        getRandomImage(2),
        getRandomImage(3),
        getRandomImage(4),  // Add this line to get an image from layer 4
    ]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(img2, 0, 0);
    ctx.drawImage(img3, 0, 0);
    ctx.drawImage(img4, 0, 0);  // Add this line to draw the image from layer 4
}

async function pickPreGeneratedImage() {
    const img = await getRandomPreGeneratedImage();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
}

function downloadImage() {
    const a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = 'image.png';
    a.click();
}

function generateOrPickImage() {
    if (Math.random() < 0.00) {
        pickPreGeneratedImage();
    } else {
        generateImage();
    }
}