import { Box, Flex, Input, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { LinkBox, LinkOverlay } from '@chakra-ui/layout'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height="100vh" width="100vw">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="gray 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box width={400}>
          <form onSubmit={handleSubmit}>
            <Text paddingY="5px" fontWeight="bold">
              Email address
            </Text>
            <Input
              placeholder="email: user@test.com"
              type="email"
              fontWeight="bold"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Text paddingY="5px" fontWeight="bold">
              Password
            </Text>
            <Input
              placeholder="password: password"
              type="password"
              fontWeight="bold"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Flex justifyContent="end">
              <Button
                type="submit"
                color="white"
                margin="20px 0 20px 0 "
                bg="rgb(144, 65, 217)"
                borderRadius="30px"
                width="80px"
                height="45px"
                isLoading={isLoading}
                sx={{
                  '&:hover': {
                    bg: 'rgb(191, 143, 235)',
                  },
                }}
              >
                {mode}
              </Button>
            </Flex>
          </form>
          {mode === 'signin' ? (
            <Box borderTop="#E8E8E8 2px solid">
              <Box marginY="20px" textAlign="center">
                <Text fontWeight="bold">No account?</Text>
              </Box>
              <LinkBox>
                <NextLink href="/signup" passHref>
                  <Button
                    color="gray"
                    bg="white"
                    borderRadius="30px"
                    border="1px solid gray"
                    width="100%"
                    height="45px"
                    sx={{
                      '&:hover': {
                        bg: 'white',
                        border: '1px solid black',
                      },
                    }}
                  >
                    <LinkOverlay>sign up</LinkOverlay>
                  </Button>
                </NextLink>
              </LinkBox>
            </Box>
          ) : (
            <Box borderTop="#E8E8E8 2px solid">
              <Box marginY="20px" textAlign="center">
                <Text fontWeight="bold">Already have account?</Text>
              </Box>
              <LinkBox>
                <NextLink href="/signip" passHref>
                  <Button
                    color="gray"
                    bg="white"
                    borderRadius="30px"
                    border="1px solid gray"
                    width="100%"
                    height="45px"
                    sx={{
                      '&:hover': {
                        bg: 'white',
                        border: '1px solid black',
                      },
                    }}
                  >
                    <LinkOverlay>sign in</LinkOverlay>
                  </Button>
                </NextLink>
              </LinkBox>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
