import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, songId } = req.body
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          connect: {
            id: songId,
          },
        },
      },
    })
    console.log({ message: 'seccuss add like' })
    res.json({})
  } catch (error) {
    console.error(error)
    res.json({ error: 'Failed' })
  }
}
