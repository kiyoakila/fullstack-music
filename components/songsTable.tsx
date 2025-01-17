import { Box } from '@chakra-ui/layout'
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from '@chakra-ui/react'
import {
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
} from 'react-icons/md'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formatters'
import { useFavorites, useMe } from '../lib/hooks'
import { delFavorite, addFavorite } from '../lib/mutations'

const SongTable = ({ songs }) => {
  const { favorites } = useFavorites()
  const { user } = useMe()

  const [likes, setLikes] = useState([])
  useEffect(() => {
    setLikes(() => [...favorites])
  }, [])

  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)
  const activeSong = useStoreState((state: any) => state.activeSong)

  const playing = useStoreState((state: any) => state.isPlaying)
  const setPlaying = useStoreActions((store: any) => store.changePlayingState)

  const setPlayState = (value) => {
    if (!value) {
      // click pause
      setPlaying(false)
    } else {
      // click play
      setPlaying(true)
      if (!activeSong) {
        setActiveSong(songs[0])
      }
      playSongs(songs)
    }
  }

  const handlePlay = (song) => {
    setActiveSong(song)
    playSongs(songs)
  }

  const handleAddFavorite = async (songId) => {
    const userId = user.id
    setLikes(() => [...likes, songId])
    await addFavorite({ userId, songId })
  }

  const handleDelFavorite = async (songId) => {
    const userId = user.id
    setLikes(() => {
      const result = likes.filter((id) => id !== songId)
      return result
    })
    await delFavorite({ userId, songId })
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        {/* play/pause button */}
        <Box padding="0 0 30px 30px">
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="60px"
              color="rgb(105, 221, 114)"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
              sx={{
                transition: '.5s ',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'rgb(105, 220, 114)',
                },
              }}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="60px"
              color="rgb(105, 221, 114)"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
              sx={{
                transition: '.5s ',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'rgb(105, 220, 114)',
                },
              }}
            />
          )}
        </Box>
        {/* song table */}
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              {/* like */}
              <Th> </Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    bg: 'rgba(255,255,255, 0.1)',
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>
                  {!likes.includes(song.id) ? (
                    <IconButton
                      // outline="none"
                      variant="link"
                      color="transparent"
                      aria-label="like"
                      // fontSize="24px"
                      icon={<MdOutlineFavoriteBorder />}
                      sx={{
                        transition: 'all .3s ',
                        '&:hover': { color: 'white' },
                      }}
                      onClick={() => {
                        handleAddFavorite(song.id)
                      }}
                    />
                  ) : (
                    <IconButton
                      variant="link"
                      color="rgb(101, 212, 110)"
                      aria-label="like"
                      icon={<MdOutlineFavorite />}
                      sx={{
                        transition: 'all .3s ',
                        '&:hover': { color: 'rgb(105, 221, 114)' },
                      }}
                      onClick={() => {
                        handleDelFavorite(song.id)
                      }}
                    />
                  )}
                </Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
