import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { subcategory } = req.query;
    const { exclude } = req.query;

    if (!subcategory || typeof subcategory !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing subcategory' });
    }

    try {
        // جلب المشاريع المتشابهة باستخدام subcategory
        const response = await fetch(`${process.env.API_URL}/projects/${subcategory}?exclude=${exclude}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'X-API-Key': process.env.API_KEY || ''
            }
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            return res.status(response.status).json({ error: data.message || 'Failed to fetch similar projects' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
