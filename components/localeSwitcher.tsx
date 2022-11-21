import React, { FC } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'



const LocaleSwitcher = () => {
  

  const {locale, asPath: currentPath} = useRouter()

  return(
    <>
      {
      	locale === 'en-US' ?
      	(
      		<span style={{ cursor: 'default' }}>
				<NextLink passHref href={currentPath} locale="es">
					<Link>
						<Typography variant="h5" component="span">
							Es
						</Typography>
					</Link>
				</NextLink>{' '}
				/{' '}
				<Link component="span" variant="h5" underline="always">
					En
				</Link>
			</span>
      	):(
            <span style={{ cursor: 'default' }}>
				<Link component="span" variant="h5" underline="always">
					Es
				</Link>{' '}
				/{' '}
				<NextLink passHref href={currentPath} locale="en-US">
					<Link>
						<Typography variant="h5" component="span">
							En
						</Typography>
					</Link>
				</NextLink>
			</span>
      	)
      }
    </>
  )
}

export default LocaleSwitcher