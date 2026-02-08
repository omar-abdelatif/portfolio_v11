import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch(`${process.env.API_URL}/about`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'X-API-Key': process.env.API_KEY || ''
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API error (about):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
