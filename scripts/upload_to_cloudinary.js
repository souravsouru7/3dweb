import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dpqgwmctl',
    api_key: '999733913915791',
    api_secret: 'zMyUE4BuSxAI93jDX7htElL1A-4'
});

const sequences = ['seq1', 'seq2', 'seq3', 'seq4'];
const publicDir = path.join(__dirname, '../public');
const limit = pLimit(5); // Limit concurrent uploads to 5

async function uploadImage(filePath, folder) {
    const fileName = path.basename(filePath, path.extname(filePath));
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `bakery/${folder}`,
            public_id: fileName,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        console.log(`Uploaded: ${result.secure_url}`);
        return result;
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error);
    }
}

async function uploadSequences() {
    for (const seq of sequences) {
        const seqDir = path.join(publicDir, seq);
        if (!fs.existsSync(seqDir)) {
            console.warn(`Directory not found: ${seqDir}`);
            continue;
        }

        const files = fs.readdirSync(seqDir).filter(file => file.endsWith('.png'));
        console.log(`Starting upload for ${seq}: ${files.length} images`);

        const uploadPromises = files.map(file => {
            const filePath = path.join(seqDir, file);
            return limit(() => uploadImage(filePath, seq));
        });

        await Promise.all(uploadPromises);
        console.log(`Finished upload for ${seq}`);
    }
}

uploadSequences()
    .then(() => console.log('All sequences uploaded successfully!'))
    .catch(err => console.error('Upload failed:', err));
