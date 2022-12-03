import  { Layout } from '@components/Layout'
import { Button } from '@ui/Button'
import { Typography } from '@ui/Typography'

import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

import { GetServerSideProps }  from 'next'
import { signIn, useSession, getSession } from 'next-auth/react'

import { AccessDenied } from '@components/AccessDenied'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {

    const session = await getSession(context)

    if (session == null) {
    	return {
          redirect: {
	        destination: '/api/auth/signin',
	        permanent: false,
          },
        }
    }

    return {
    	props: {session},
    } 

}

function PremiumPage() {

    const { data: session, loading } = useSession()
    const [ imageUrl, setImageUrl] = useState<string | null>(null)
    const [refetchCounter, refetch] = useState(0)
    const { t } = useTranslation(['page-premium'])

    useEffect(() => {
        fetch('/api/premium')
        .then((response) => response.json())
        .then(({ data }) => setImageUrl(data))
    }, [refetchCounter])

    if (loading) {
    	return null
    } 
    
    
   if (session == null) {
   	return (
   		<AccessDenied />
   	)
   }


	return (
      <Layout title="Premium content">
        <div>
            <Typography variant="h2">
              {t('welcomen', { name: session.user?.name })}
            </Typography>
            <Typography variant="body2" className="mt-1">
               {t('hereIsYourPremiumContent')}
            </Typography>     
            <div className="max-w-lg mx-auto text-center my-8">
                {imageUrl == null ? null : 
                  <img
                     key={imageUrl}
                     src={imageUrl}
                     alt="Random fox"
                     className="rounded"
                  />
                }
            </div>
            <Button variant="outlined" onClick={() => refetch((c) => ++c)}>
                {t('more')}
            </Button>
        </div>
      </Layout>
	)
}

export default PremiumPage