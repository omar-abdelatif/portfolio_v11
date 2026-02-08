import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing slug' });
    }
    try {
        const response = await fetch(`${process.env.API_URL}/projects/project_details/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'X-API-Key': process.env.API_KEY || ''
            }
        });
        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json({ error: data.message || 'Failed to fetch project data' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}