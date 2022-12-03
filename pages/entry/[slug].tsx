import { flatMap } from 'lodash'
import { getPlant, getPlantList, getCategoryList } from '@api'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'
import { PlantEntryInline } from '@components/PlantCollection'
import { GetStaticProps, InferGetStaticPropsType} from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useTranslation } from 'next-i18next'

type PathType = {
  params: {
    slug: string,
  }
  locales: string
}

export const getStaticPaths = async ({ locales }) => {

    const { t } = useTranslation(['page-plant-entry']) 

  if(locales === undefined) {
    throw new Error('Uh, did you forget configure locales in your Next.js config')
  }

  const entries = await getPlantList({ limit: 10 })

  const paths: PathType[] = flatMap(entries.map((plant) => ({
    params: {
      slug: plant.slug,
    },
  })),
  (path) => locales.map((loc) => ({ locale: loc, ...path}))
  )

  return {
    paths,

    fallback: true,
  }
} 

type PlantEntryPageProps = {
  plant: Plant | null
  otherEntries: Plant[] | null 
  categories: Category[] | null
}

export const getStaticProps: GetStaticProps<PlantEntryPageProps> = async ({ params, preview, locale }) => {
  
  const slug = params?.slug

  if(typeof slug !== 'string'){
    return {
      notFound: true
    }
  }

  try{

    const plant = await getPlant(slug, preview, locale)
    const otherEntries = await getPlantList({ limit: 5 })
    const categories = await getCategoryList({ limit: 10 })  
      return {
        props: {
          plant,
          otherEntries,
          categories
        },
        revalidate: 5 * 60,
      }

  }
  catch (e) {
    return {
      notFound: true  
    }
  }
}

export default function PlantEntryPage({ plant, otherEntries, categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const router = useRouter()

  if (plant == null){
    return(
      <Layout>
        Page not found
      </Layout>
    )
  }

  if(router.isFallback) {
    return (
      <Layout>
        Loading awesomeness...
      </Layout>    
    )
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img src={plant.image.url}/>
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant?.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              {t('recentPosts')}
            </Typography>
            {otherEntries?.map((plantEntry) => (
              <article className="mb-4" key={plantEntry?.id}>
                <PlantEntryInline {...plantEntry}/> 
              </article>
            ))}
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              {t('categories')}
            </Typography>
            <ul className="list">
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link passHref href={`/category/${category?.slug}`}>
                    <Typography component="a" variant="h6">
                      {category?.title} 
                    </Typography>
                  </Link> 
                </li> 
              ))}
            </ul>
          </section>
        </Grid>
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant?.author} />
      </section>
    </Layout>
  )
}