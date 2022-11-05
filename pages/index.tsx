import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useState, useEffect } from 'react'
import { Grid } from '@ui/Grid'
import { Button } from '@ui/Button'
import { Typography } from '@ui/Typography'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { Authors } from '@components/Authors'
import { Hero } from '@components/Hero'
import { getPlantList } from '@api'

type HomeProps = { plants: Plants[] }

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  
  const plants = await getPlantList({ limit: 10})

  return {
    props: {
      plants,
    },
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
      <PlantCollection plants={plants} variants="squard"/>
    </Layout>
  )
}
