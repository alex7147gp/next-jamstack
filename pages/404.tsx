import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { useTranslation } from 'next-i18next'

export default function NotFoundPage() {

  const { t, ready } = useTranslation(['page-errors'])

  console.log(ready)
  console.log(t('wearsorry'))

  return (
    <Layout title="404">
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🍂 {t('wearesorry')}
        </Typography>
        <Typography variant="body1" className="mb-6">
          {t('notFoundErrorMessage')}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          href="/"
          title="Go back home"
        >
          {t('goHome')}
        </Button>
      </div>
    </Layout>
  )
}