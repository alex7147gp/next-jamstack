import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { Authors } from '@components/Authors'
import { Hero } from '@components/Hero'
import { getPlantList } from '@api'

type HomeProps = { plants: Plant[] }

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {

  const plants = await getPlantList({ limit: 10, locale })
  const i18nConf = await serverSideTranslations(locale!)

  return {
    props: {
      plants,
      ...i18nConf
    },
    revalidate: 5 * 60,
  }
}

export default function Home({plants}: InferGetStaticPropsType<typeof getStaticProps>) {
  
  return (
    <Layout>
      <Hero {...plants[0]} className="mb-20" />
      <Authors className="mb-10" />
      <PlantCollection 
        plants={plants.slice(1, 3)} 
        variant="vertical" 
        className="mb-24" 
      />
      <PlantCollection plants={plants} variant="square"/>
    </Layout>
  )
}
