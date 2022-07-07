import prisma from '../../lib/prisma'
import { validateRoute } from '../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const favoriteSongs = await prisma.song.findMany({
    where: {
      likedUsers: { some: { id: user.id } },
    },
    select: {
      id: true,
    },
  })
  const favorites = favoriteSongs.map((song) => {
    return song.id
  })

  res.json(favorites)
})
