import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import MigrationComponent from "../components/migrateData"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <MigrationComponent/>
  </Layout>
)

export default IndexPage
