import { useStoreActions, useStoreState } from 'easy-peasy'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
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
import { useState, useEffect } from 'react'
import MenuItem from './menuItem'
import { createplaylist } from '../lib/mutations'
import { usePlaylist, useMe } from '../lib/hooks'

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

const Sidebar = () => {
  const { playlists } = usePlaylist()
  const { user } = useMe()
  const [lists, setLists] = useState([])
  useEffect(() => {
    setLists(playlists)
  }, [playlists])

  const router = useRouter()

  const activePlaylist = useStoreState((state: any) => state.activePlaylist)
  const setActivePlaylist = useStoreActions(
    (store: any) => store.changeActivePlaylist
  )

  const handleSetActivePlaylist = (id) => {
    if (activePlaylist === null) {
      setActivePlaylist(0)
    } else {
      setActivePlaylist(+id)
    }
  }

  const handleCreatePlaylist = async () => {
    const newPlaylist = await createplaylist({ user })
    const route = `/playlist/${newPlaylist.id}`
    const newPlaylists = [...lists, newPlaylist]
    setLists(newPlaylists)
    router.push(route)
  }

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray.500"
    >
      <Box paddingY="30px" height="100%">
        <Box marginBottom="20px">
          <List spacing={5}>
            {navMenu.map((menu) => (
              <MenuItem menu={menu} />
            ))}
          </List>
        </Box>
        <Box marginTop="40px">
          <List spacing={5}>
            {/* create playlist */}
            <ListItem
              fontWeight="bold"
              paddingX="20px"
              fontSize="14px"
              key={musicMenu[0].name}
              sx={{
                transition: 'all .3s ',
                '&:hover': {
                  color: 'rgba(255,255,255, 1)',
                },
              }}
              cursor="pointer"
            >
              <LinkBox onClick={() => handleCreatePlaylist()}>
                <LinkOverlay>
                  <ListIcon
                    as={musicMenu[0].icon}
                    color="white"
                    marginRight="10px"
                  />
                  {musicMenu[0].name}
                </LinkOverlay>
              </LinkBox>
            </ListItem>
            {/* favorites */}
            <MenuItem menu={musicMenu[1]} />
          </List>
        </Box>
        <Center>
          <Divider color="gray.800" paddingY="10px" width="85%" />
        </Center>
        <Box height="66%" overflowY="auto" paddingY="10px" fontSize="14px">
          <List>
            {lists.map((playlist) => (
              <ListItem
                paddingX="20px"
                paddingY="5px"
                key={playlist.id}
                color={
                  activePlaylist === playlist.id
                    ? 'rgba(255,255,255, 1)'
                    : 'gray.500'
                }
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    color: 'rgba(255,255,255, 1)',
                    // transform: 'scale(1.1)',
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
                    <LinkOverlay
                      onClick={() => handleSetActivePlaylist(playlist.id)}
                    >
                      {playlist.name}
                    </LinkOverlay>
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
