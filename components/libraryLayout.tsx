import { Box, Flex, LinkBox, LinkOverlay } from '@chakra-ui/layout'
import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const LibraryLayout = ({ active, children }) => {
  const router = useRouter()
  return (
    <Box
      position="absolute"
      bg="rgb(18,18,18)"
      height="100%"
      // overflowX="hidden"
      // overflowX="scroll"
      width="calc(100vw - 235px)"
    >
      <Box paddingY="20px" paddingX="20px" width="100%">
        <ButtonGroup marginup="20px" paddingX="10px">
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
          <LinkBox>
            <NextLink href={{ pathname: '/library' }} passHref>
              <Box
                as="button"
                color="rgb(255, 255, 255)"
                bg={active === 'playlists' ? 'rgb(50,50,50)' : 'rgb(18,18,18)'}
                aria-label="playlists"
                fontSize="14px"
                borderRadius="4px"
                fontWeight="bold"
                transition="all 0.3s"
                _hover={{ bg: 'rgb(50,50,50)' }}
                paddingX="15px"
                paddingY="10px"
              >
                <LinkOverlay>Playlists</LinkOverlay>
              </Box>
            </NextLink>
          </LinkBox>
          <LinkBox>
            <NextLink href={{ pathname: '/library/artist' }} passHref>
              <Box
                as="button"
                color="rgb(255, 255, 255)"
                bg={active === 'artists' ? 'rgb(50,50,50)' : 'rgb(18,18,18)'}
                aria-label="artists"
                fontSize="14px"
                borderRadius="4px"
                fontWeight="bold"
                transition="all 0.3s"
                _hover={{ bg: 'rgb(50,50,50)' }}
                paddingX="15px"
                paddingY="10px"
              >
                <LinkOverlay>Artists</LinkOverlay>
              </Box>
            </NextLink>
          </LinkBox>
          <LinkBox>
            <NextLink href={{ pathname: '/library/album' }} passHref>
              <Box
                as="button"
                color="rgb(255, 255, 255)"
                bg={active === 'albums' ? 'rgb(50,50,50)' : 'rgb(18,18,18)'}
                aria-label="albums"
                fontSize="14px"
                borderRadius="4px"
                fontWeight="bold"
                transition="all 0.3s"
                _hover={{ bg: 'rgb(50,50,50)' }}
                paddingX="15px"
                paddingY="10px"
              >
                <LinkOverlay>Albums</LinkOverlay>
              </Box>
            </NextLink>
          </LinkBox>
        </ButtonGroup>
      </Box>

      <Box color="white" paddingX="40px">
        {children}
      </Box>
    </Box>
  )
}
export default LibraryLayout
