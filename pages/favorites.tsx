import GradientLayout from '../components/gradientLayout'
import SongTable from '../components/songsTable'
import { validateToken } from '../lib/auth'
import prisma from '../lib/prisma'

const Favorites = ({ favorites, userData }) => {
  const color = 'purple'

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title="Liked Songs"
      subtitle="PLAYLIST"
      description={`${userData?.firstName}  ·  ${favorites.length} songs`}
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
      likedUsers: { some: { id: user.id } },
    },
  })
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })
  // console.log(favorites)
  return {
    props: { favorites, userData },
  }
}
export default Favorites
