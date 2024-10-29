import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid'; 

const app = express();
const upload = multer();
app.use(express.json());
app.use(cors());

let hashMap = new Map<string, CID>();

async function run() {
    const helia = await createHelia();
    const fs = unixfs(helia);
    
    app.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
        const data = req.file?.buffer; 
        if (!data) {
             res.status(400).json({ message: 'No file uploaded' });
             return;
        }

        const cid = await fs.addBytes(data);
        if (!req.file) {
             res.status(400).json({ message: 'No file uploaded' });
             return;
        }
        hashMap.set(req.file.originalname, cid);  

        res.status(201).json({
            message: 'Your file has been uploaded',
            cid: cid.toString() 
        });
    });

    app.get('/fetch/:filename', async (req: Request, res: Response): Promise<void> => {
        const filename = req.params.filename;
        const cid = hashMap.get(filename);

        if (!cid) {
             res.status(404).send('We could not find the file');
             return;
        }

        let text = '';
        const decoder = new TextDecoder();
        for await (const chunk of fs.cat(cid)) {
            text += decoder.decode(chunk, { stream: true });
        }
        text += decoder.decode(); 

        res.status(200).send(text);
    });

    app.listen(7000, () => {
        console.log('I am listening...');
    });
}

run();
