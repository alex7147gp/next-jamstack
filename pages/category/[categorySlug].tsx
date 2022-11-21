import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'

import { getCategoryList, getPlantListByCategory } from '@api'

import { Alert } from '@ui/Alert'
import { Typography } from '@ui/Typography'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

import { useTranslation } from 'next-i18next'

  const { t } = useTranslation(['page-category']) 

type CategoryPageProps = {
  entries: Plant[]
  category: Category
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
}) => {
  const slug = params?.categorySlug

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const { entries, category } = await getPlantListByCategory({
      category: slug,
      limit: 12,
    })

    return {
      props: {
        entries,
        category,
        status: 'success',
      },
      revalidate: 15 * 60, // once every fifteen minutes
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

type PathType = {
  params: {
    categorySlug: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoriesToGenerate = await getCategoryList({ limit: 10 })

  const paths: PathType[] = categoriesToGenerate.map(
    ({ slug: categorySlug }) => ({
      params: {
        categorySlug,
      },
    })
  )

  return {
    paths,

    // Block until the server gets its data. Like in Server side rendering
    fallback: 'blocking',
  }
}

export default function CategoryPage({
  entries,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Typography variant="h2" className="text-center mb-12">
        {t('category')}: {category.title}
      </Typography>
      <PlantCollection plants={entries} />
      {entries.length > 0 ? null : (
        <Alert severity="info">
          {t('categoryHasNoEntries')} {category.title}
        </Alert>
      )}
      {/* Pagination is missing. Can you add it?  */}
      {/* Check our "Grandes Datasets" course for advanced HTTP techniques :) */}
    </Layout>
  )
}