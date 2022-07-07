import { Box, Text, Flex } from '@chakra-ui/layout'
import GradientLayout from '../components/gradientLayout'
import Card from '../components/card'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user } = useMe()

  return (
    <GradientLayout
      roundImage
      color="gray"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image={`${user?.profile}`}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        {/* Artist cards */}
        <Flex>
          {artists.map((artist) => (
            <Card
              image={`${artist.profile}`}
              title={artist.name}
              subtitle="Artist"
              roundImage
              pathname="/artist/[id]"
              id={artist.id}
            />
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default Home
