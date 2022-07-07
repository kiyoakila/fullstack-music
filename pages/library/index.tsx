import { Box, Text, Flex, LinkBox, LinkOverlay } from '@chakra-ui/layout'
import { Button, ButtonGroup, IconButton, Image } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useRouter } from 'next/router'
import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'
import Card from '../../components/card'
import { useMe } from '../../lib/hooks'

const Library = ({ playlists }) => {
  const { user } = useMe()
  const router = useRouter()
  return (
    <Box bg="rgb(18,18,18)" height="100%" overflowY="auto">
      <Flex paddingY="20px" paddingX="20px">
        <ButtonGroup marginup="20px">
          <IconButton
            // bg="gray.500"
            color="white"
            outline="none"
            variant="link"
            aria-label="go-back"
            fontSize="24px"
            icon={<MdKeyboardArrowLeft />}
            onClick={() => router.back()}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="forward"
            fontSize="24px"
            icon={<MdKeyboardArrowRight />}
          />
        </ButtonGroup>
        <ButtonGroup marginLeft="40px">
          <Box
            as="button"
            color="rgb(255, 255, 255)"
            bg="rgb(50,50,50)"
            aria-label="playlists"
            fontSize="14px"
            borderRadius="4px"
            fontWeight="bold"
            transition="all 0.3s"
            // _hover={{ bg: 'rgb(50,50,50)' }}
            paddingX="15px"
            paddingY="10px"
          >
            Playlists
          </Box>
          <Box
            as="button"
            color="rgb(255, 255, 255)"
            bg="rgb(18,18,18)"
            aria-label="playlists"
            fontSize="14px"
            borderRadius="4px"
            fontWeight="bold"
            transition="all 0.3s"
            _hover={{ bg: 'rgb(50,50,50)' }}
            paddingX="15px"
          >
            Artists
          </Box>
          <Box
            as="button"
            color="rgb(255, 255, 255)"
            bg="rgb(18,18,18)"
            aria-label="playlists"
            fontSize="14px"
            borderRadius="4px"
            fontWeight="bold"
            transition="all 0.3s"
            _hover={{ bg: 'rgb(50,50,50)' }}
            paddingX="15px"
          >
            Albums
          </Box>
        </ButtonGroup>
      </Flex>

      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Playlists
          </Text>
        </Box>

        <Flex>
          {playlists.map((playlist) => (
            <Card
              image={`https://picsum.photos/400?random=${playlist.id}`}
              title={playlist.name}
              subtitle={`Made by: ${user?.firstName}`}
              roundImage={false}
              pathname="/playlist/[id]"
              id={playlist.id}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export const getServerSideProps = async ({ req, res }) => {
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
