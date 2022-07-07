import GradientLayout from '../../components/gradientLayout'
import SongTable from '../../components/songsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'
import NextLink from 'next/link'

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const AlbumPlaylist = ({ songs, album }) => {
  const color = getBGColor(songs.artistId)

  // const description = () => {
  //   return (
  //     <NextLink href={{ pathname: `/artist/${album.artistId}` }} passHref>
  //       ${album.artist.name}
  //     </NextLink>
  //   )
  // }

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={album.name}
      subtitle="Album"
      description={`${album.artist.name} · ${songs.length} songs`}
      image={album.cover}
    >
      <SongTable songs={songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ params, req }) => {
  try {
    validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const songs = await prisma.song.findMany({
    where: {
      albumId: +params.id,
    },
    include: {
      artist: true,
    },
  })

  const album = await prisma.album.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      artist: {
        select: {
          name: true,
        },
      },
    },
  })
  console.log(album)
  return {
    props: { songs, album },
  }
}
export default AlbumPlaylist
