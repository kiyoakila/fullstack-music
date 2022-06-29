import GradientLayout from '../components/gradientLayout'
import SongTable from '../components/songsTable'
import { validateToken } from '../lib/auth'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Favorites = ({ favorites }) => {
  const { user } = useMe()
  const color = 'purple'

  return (
    // <GradientLayout
    //   color={color}
    //   roundImage={false}
    //   title={playlist.name}
    //   subtitle="playlist"
    //   description={`${playlist.songs.length} songs`}
    //   image={`https://picsum.photos/400?random=${playlist.id}`}
    // >
    //   <SongTable songs={playlist.songs} />
    // </GradientLayout>
    <GradientLayout
      color={color}
      roundImage={false}
      title="Liked Songs"
      subtitle="PLAYLIST"
      description={`${user?.firstName}  ·  ${favorites.length} songs`}
      image="https://placekitten.com/300/300"
    >
      <SongTable songs={favorites} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ req }) => {
  let user

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }
  const favorites = await prisma.song.findMany({
    where: {
      users: {
        some: {
          id: {
            equals: user.id,
          },
        },
      },
    },
  })
  // console.log(favorites)
  return {
    props: { favorites },
  }
}
export default Favorites
