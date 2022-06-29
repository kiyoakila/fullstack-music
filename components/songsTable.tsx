import { Box } from '@chakra-ui/layout'
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from '@chakra-ui/react'
import {
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
} from 'react-icons/md'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formatters'

const SongTable = ({ songs }) => {
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

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
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
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
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
