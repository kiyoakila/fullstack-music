import { Box, Text, Flex } from '@chakra-ui/layout'
import prisma from '../../lib/prisma'
import Card from '../../components/card'
import LibraryLayout from '../../components/libraryLayout'

const ArtistLibrary = ({ artists }) => {
  return (
    <LibraryLayout active="artists">
      <Box marginBottom="40px">
        <Text fontSize="2xl" fontWeight="bold">
          Artist
        </Text>
      </Box>
      <Flex flexWrap="wrap">
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
    </LibraryLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default ArtistLibrary
