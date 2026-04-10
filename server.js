import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
    origin:'https://neon-marigold-fa2ddf.netlify.app/'
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.use(express.static(__dirname)); 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/open-sesame', async (req,res) =>{
    const { name, email, phone } = req.body;

    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, phone }]);

    if (error) {
        console.error('Supabase Error: ', error);
        return res.status(500).json({ message: 'Error saving to Supabase'});
    } 

    console.log('Data saved to Supabase:', data);
    res.json({ message: 'Data saved successfully to Supabase!'});

});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});