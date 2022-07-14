import { Box, Text, LinkBox, LinkOverlay, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useState, useEffect } from 'react'

const Card = ({ image, title, subtitle, roundImage, pathname, id }) => {
  // function useMediaQuery(query) {
  //   const [matches, setMatches] = useState(false)

  //   useEffect(() => {
  //     const media = window.matchMedia(query)
  //     if (media.matches !== matches) {
  //       setMatches(media.matches)
  //     }
  //     const listener = () => {
  //       setMatches(media.matches)
  //     }
  //     media.addListener(listener)
  //     return () => media.removeListener(listener)
  //   }, [matches, query])

  //   return matches
  // }

  return (
    <Flex flex="0 0 20%">
      <LinkBox marginRight="20px" marginBottom="10px">
        <Box
          bg="rgb(24, 24, 24)"
          borderRadius="6px"
          padding="15px"
          width="100%"
          sx={{
            transition: '.3s ',
            '&:hover': {
              bg: 'rgb(40, 40, 40)',
            },
          }}
        >
          <Image src={image} borderRadius={roundImage ? '100%' : '3px'} />
          <Box margin="20px 0 20px 0">
            <NextLink
              href={{
                pathname: `${pathname}`,
                query: { id },
              }}
              passHref
            >
              <LinkOverlay>
                <Text fontSize="large" fontWeight="bold">
                  {title}
                </Text>
              </LinkOverlay>
            </NextLink>
            <Text fontSize="small" color="gray.500">
              {subtitle}
            </Text>
          </Box>
        </Box>
      </LinkBox>
    </Flex>
  )
}

export default Card
