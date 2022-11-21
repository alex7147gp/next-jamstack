import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { useTranslation } from 'next-i18next'

  const { t } = useTranslation(['page-errors']) 

export default function NotFoundPage({
  statusCode = 500,
}: {
  statusCode?: number
}) {
  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🍄 {t('somthingWentWrong')}
        </Typography>
        <Typography variant="body1" className="mb-6">
          {t('errorMessage')}
        </Typography>
        <Typography variant="body1" className="mb-6">
          <span className="bg-gray-300 inline-block">
            ERRORCODE: {statusCode}
          </span>
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