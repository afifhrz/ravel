const https = require('https');
const fs = require('fs');
const path = require('path');

const reportsDir = 'C:\\Users\\afifs\\AppData\\Local\\hermes\\profiles\\ravel\\household\\market_data\\reports';

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const pdfs = [
  {
    url: 'https://investor.sidomuncul.co.id/misc/fr/2026/Q1-2026.pdf',
    filename: 'SIDO_Q1_2026.pdf'
  }
];

function downloadPdf(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(reportsDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadPdf(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename} (${fs.statSync(filepath).size} bytes)`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const pdf of pdfs) {
    try {
      await downloadPdf(pdf.url, pdf.filename);
    } catch (err) {
      console.error(`Failed to download ${pdf.filename}: ${err.message}`);
    }
  }
}

main();
