import { ListItem, ListIcon, LinkBox, LinkOverlay } from '@chakra-ui/layout'

import NextLink from 'next/link'

const MenuItem = ({ menu }) => {
  return (
    <ListItem
      fontWeight="bold"
      paddingX="20px"
      fontSize="14px"
      // key=""
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
            <ListIcon as={menu.icon} color="white" marginRight="10px" />
            {menu.name}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  )
}

export default MenuItem
