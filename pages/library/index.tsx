import { Box, Text, Flex } from '@chakra-ui/layout'
import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'
import Card from '../../components/card'
import { useMe } from '../../lib/hooks'
import LibraryLayout from '../../components/libraryLayout'

const Library = ({ playlists }) => {
  const { user } = useMe()
  return (
    <LibraryLayout active="playlists">
      <Box marginBottom="40px">
        <Text fontSize="2xl" fontWeight="bold">
          Playlists
        </Text>
      </Box>
      <Flex flexWrap="wrap">
        {playlists.map((playlist) => (
          <Card
            image={`https://picsum.photos/400?random=${playlist.id}`}
            title={playlist.name}
            subtitle={`Made by: ${user?.firstName}`}
            roundImage={false}
            pathname="/playlist/[id]"
            id={playlist.id}
            key={playlist.id}
          />
        ))}
      </Flex>
    </LibraryLayout>
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

  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
  })
  return {
    props: { playlists },
  }
}

export default Library
