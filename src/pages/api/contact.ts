import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const endpoint = 'contact';
    try {
        const apiUrl = `${process.env.API_URL}/${endpoint}`;
        console.log('Contacting API at:', apiUrl);
        console.log('Request body:', req.body);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'X-API-Key': process.env.API_KEY || ''
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        console.log('Backend response status:', response.status);
        console.log('Backend response data:', data);
        
        if (!response.ok) {
            console.error('Backend contact error:', data);
            return res.status(response.status).json({ error: data.message || 'Failed to send contact message' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('API error (contact):', error);
        res.status(500).json({ error: 'Internal Server Error', details: String(error) });
    }
}
