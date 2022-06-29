import GradientLayout from '../../components/gradientLayout'
import SongTable from '../../components/songsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

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

const ArtistPlaylist = ({ songs }) => {
  const color = getBGColor(songs.artistId)

  return (
    <GradientLayout
      color={color}
      roundImage
      title={songs[0].artist.name}
      subtitle=""
      description="10000 month listeners"
      image="https://placekitten.com/300/300`"
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
      artistId: +params.id,
    },
    include: {
      artist: true,
    },
  })

  return {
    props: { songs },
  }
}
export default ArtistPlaylist
