import { Box, Text, Flex, LinkBox, LinkOverlay } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import GradientLayout from '../components/gradientLayout'
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
      image="https://cdn.pixabay.com/photo/2020/09/27/18/08/cat-5607424__480.jpg"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <LinkBox paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <NextLink
                    href={{
                      pathname: '/artist/[id]',
                      query: { id: artist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>
                      <Text fontSize="large">{artist.name}</Text>
                    </LinkOverlay>
                  </NextLink>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </LinkBox>
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
