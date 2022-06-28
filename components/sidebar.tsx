import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
]

// const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`)

const Sidebar = () => {
  const { playlists } = usePlaylist()
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="150px" marginBottom="20px" paddingX="10px">
          <NextImage src="/logo.svg" height={120} width={240} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem
                fontWeight="bold"
                paddingX="20px"
                fontSize="16px"
                key={menu.name}
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    color: 'rgba(255,255,255, 1)',
                  },
                }}
                cursor="pointer"
              >
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="10px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginTop="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem
                fontWeight="bold"
                paddingX="20px"
                fontSize="16px"
                key={menu.name}
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    color: 'rgba(255,255,255, 1)',
                  },
                }}
                cursor="pointer"
              >
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="10px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Center>
          <Divider color="gray.800" paddingY="10px" width="85%" />
        </Center>
        <Box height="66%" overflowY="auto" paddingY="10px" fontSize="16px">
          <List spaceing={2}>
            {playlists.map((playlist) => (
              <ListItem
                paddingX="20px"
                paddingY="2.5px"
                key={playlist.id}
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    color: 'rgba(255,255,255, 1)',
                  },
                }}
                cursor="pointer"
              >
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
