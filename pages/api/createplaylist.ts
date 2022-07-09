import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body

  const playlistCount = await prisma.playlist.count()

  const newPlaylist = await prisma.playlist.create({
    data: {
      name: `My Playlist #${playlistCount + 1}`,
      user: {
        connect: { id: user.id },
      },
    },
  })

  res.json(newPlaylist)
}
