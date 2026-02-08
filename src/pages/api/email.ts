import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const endpoint = 'send/email';

    try {
        const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.API_KEY || ''
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.message || 'Failed to send email' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
