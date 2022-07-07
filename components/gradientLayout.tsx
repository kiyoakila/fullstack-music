import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, ButtonGroup, IconButton } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

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

  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(18,18,18,1) 75%)`}
    >
      {/* Buttons: prev and next */}
      <Flex bg={`${color}.600`} paddingY="20px" paddingX="20px">
        <ButtonGroup marginup="20px" paddingX="10px">
          <IconButton
            // bg="gray.500"
            color="gray.900"
            outline="none"
            variant="link"
            aria-label="go-back"
            fontSize="24px"
            icon={<MdKeyboardArrowLeft />}
            onClick={() => router.back()}
          />
          <IconButton
            color="gray.900"
            outline="none"
            variant="link"
            aria-label="forward"
            fontSize="24px"
            icon={<MdKeyboardArrowRight />}
          />
        </ButtonGroup>
      </Flex>
      {/* Banner */}
      <Flex bg={`${color}.600`} padding="40px" align="end">
        {/* Profile */}
        <Box padding="20px">
          <Image
            boxSize="230px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
            objectFit="cover"
          />
        </Box>
        {/* Texts */}
        <Box padding="20px 0 10px 10px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="8xl" fontWeight="extrabold" padding="20px 0 35px 0">
            {title}
          </Text>
          <Text fontSize="x-small" color="gray.200">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
