const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

// Load and draw the default image as soon as the page loads
window.addEventListener('load', loadDefaultImage);
generateBtn.addEventListener('click', () => {
    if (Math.random() < 0.05) { // 10% chance to pick a pre-generated image
        pickPreGeneratedImage();
    } else { // 90% chance to generate a new image
        generateImage();
    }
});
downloadBtn.addEventListener('click', downloadImage);

function getDefaultImage() {
    return fetch(`assets/placeholder.png`) // adjust this to your placeholder's path
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob));
}

async function loadDefaultImage() {
    const img = await getDefaultImage();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
}

function getRandomImage(layer) {
    const index = Math.floor(Math.random() * 14) + 1;
    return fetch(`assets/${layer}/layer${layer}-${index}.png`)
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob));
}

function getRandomPreGeneratedImage() {
    const index = Math.floor(Math.random() * 1) + 1;
    return fetch(`assets/4/image${index}.png`)
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
