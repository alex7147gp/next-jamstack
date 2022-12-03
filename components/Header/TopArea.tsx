import { useRouter } from 'next/router'

import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { useTranslation } from 'next-i18next'


import { signIn, singOut, useSession } from 'next-auth/react'

export function TopArea() {
  const { locales, locale } = useRouter()

  // Locales aren't configured
  if (locales == undefined || locale == undefined) {
    return null
  }

  return (
    <Grid container justify="space-between">
      <Grid item>
        <LoginLogout />
      </Grid>
      <Grid item>
        <LocalOptions />
      </Grid>
    </Grid>
  )
}

function LoginLogout() {
  const { t } = useTranslation(['common'])
  
  const { data: session, status } = useSession() 

  if (status === 'loading') return null

  if (session == null) {
    return (
      <Button onClick={() => signIn()}>
        {t('signIn')}
      </Button>
    )
  }

  return(
    <>
      <span>{session.user?.name}</span>
      <Button onClick={() => signOut}>{t('signOut')}</Button>
    </>
  )

}

function LocalOptions() {
  const { locales, locale } = useRouter()
  const { t } = useTranslation(['common'])
 
  return(
    <>
      <Typography variant="body2" component="span" className="pr-3">
        Language:
      </Typography>
      {locales.map((loc) => (
        <form
          action="/api/language"
          method="POST"
          key={loc}
          className="inline-block"
        >
          <input name="preferredLocale" value={loc} type="hidden"></input>
          <Button
            variant={loc === locale ? 'outlined' : 'text'}
            className="ml-1"
            type="submit"
          >
           {loc}
          </Button>
        </form>
      ))}
    </>
  )

} 