import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Fasctswrangler</title>
      </Head>

      <main className={styles.main}>
        <section className={utilStyles.headingMd}>
          <p>
          Hello, I'm just the guy building this site.
          </p>
        </section>
      </main>

    </Layout>
  )
}
