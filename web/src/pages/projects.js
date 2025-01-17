import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../libs/helpers'

import Seo from '../components/seo'
import Layout from '../containers/MainLayout'
import Projects from 'Section/Projects'

const ProjectPage = () => {
  const { projects } = useStaticQuery(
    graphql`
      query {
        projects: allSanityProject(
          limit: 100
          sort: { fields: [publishedAt], order: DESC }
        ) {
          edges {
            node {
              id
              publishedAt
              title
              slug {
                current
              }
              categories {
                title
              }
              mainImages {
                asset {
                  url
                  _id
                }
              }
            }
          }
        }
      }
    `
  )

  const projectNodes = projects
    ? mapEdgesToNodes(projects).filter(filterOutDocsWithoutSlugs)
    : []

  return (
    <Layout>
      <Seo title="Projects" description='Illustration | Logo & Brand Identity | Packaging | Web Design' />
      {projectNodes && <Projects projects={projectNodes} />}
    </Layout>
  )
}

export default ProjectPage
