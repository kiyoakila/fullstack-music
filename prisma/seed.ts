import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { artistsData } from './albumData'

const prisma = new PrismaClient()

const run = async () => {
  prisma.playlist.deleteMany()

  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          profile: artist.profile,
          albums: {
            create: {
              name: artist.album.albumName,
              cover: artist.album.albumCover,
            },
          },
          songs: {
            create: artist.songs.map((song) => ({
              name: song.songName,
              duration: song.duration,
              url: song.url,
              album: {
                connect: { name: artist.album.albumName },
              },
            })),
          },
        },
      })
    })
  )

  const songs = await prisma.song.findMany({})

  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      profile:
        'https://cdn.pixabay.com/photo/2020/09/27/18/08/cat-5607424__480.jpg',
      password: bcrypt.hashSync('password', salt),
      firstName: 'Ruiqi',
      favorites: {
        connect: {
          id: songs[1].id,
        },
      },
      lastName: 'Huang',
    },
  })

  await Promise.all(
    new Array(5).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      })
    })
  )
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
