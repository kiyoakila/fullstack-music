import { Box, Text, Flex } from '@chakra-ui/layout'
import prisma from '../../lib/prisma'
import Card from '../../components/card'
import LibraryLayout from '../../components/libraryLayout'

const ArtistLibrary = ({ albums }) => {
  return (
    <LibraryLayout active="albums">
      <Box marginBottom="40px">
        <Text fontSize="2xl" fontWeight="bold">
          Artist
        </Text>
      </Box>
      <Flex>
        {albums.map((album) => (
          <Card
            image={album.cover}
            title={album.name}
            subtitle={album.artist.name}
            roundImage={false}
            pathname="/album/[id]"
            id={album.id}
          />
        ))}
      </Flex>
    </LibraryLayout>
  )
}

export const getServerSideProps = async () => {
  const albums = await prisma.album.findMany({
    include: {
      artist: {
        select: {
          name: true,
        },
      },
    },
  })

  return {
    props: { albums },
  }
}

export default ArtistLibrary
