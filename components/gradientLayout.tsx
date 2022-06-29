import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, ButtonGroup, IconButton } from '@chakra-ui/react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io'

import { useRouter } from 'next/router'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  const router = useRouter()
  // <button type="button" onClick={() => router.back()}>
  //   Click here to go back
  // </button>

  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} paddingY="20px">
        <ButtonGroup marginup="20px">
          <IconButton
            outline="none"
            variant="link"
            aria-label="go-back"
            fontSize="24px"
            icon={<GrFormPrevious />}
            onClick={() => router.back()}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="forward"
            fontSize="24px"
            icon={<GrFormNext />}
          />
          {/* <IconButton
            outline="none"
            variant="link"
            aria-label="back"
            fontSize="24px"
            colorScheme="white"
            icon={<IoIosArrowDropleftCircle />}
            onClick={back}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="foward"
            fontSize="24px"
            colorScheme="blackAlpha"
            icon={<IoIosArrowDroprightCircle />}
            onClick={forward}
          /> */}
        </ButtonGroup>
      </Flex>
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
            objectFit="cover"
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
