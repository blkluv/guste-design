import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const detailsQuery = graphql`
  query SEOQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      openGraph {
        title
        description
        keywords
        image {
          asset {
            url
          }
        }
      }
    }
  }
`

function SEO({ description, lang, meta, keywords, title, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        if (!data.site) {
          return
        }
        
        const og = data.site.openGraph
        const siteTitle = data.site.title
        const pageTitle = title | siteTitle || og.title
        const metaDescription = description || og.description
        const metaImage = image ? image : og.image
        const metaKeywords = keywords || og.keywords
        console.log('TITLE', title, data)
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={pageTitle}
            titleTemplate={title === pageTitle ? '%s' : `%s | ${pageTitle}`}
            meta={[
              {
                name: 'description',
                content: metaDescription
              },
              {
                property: 'og:title',
                content: title
              },
              {
                property: 'og:description',
                content: metaDescription
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                property: 'og:image',
                content: metaImage
              },
              {
                name: 'twitter:card',
                content: 'summary'
              },
              {
                name: 'twitter:card',
                content: metaDescription
              },
              {
                name: 'twitter:title',
                content: title
              },
              {
                name: 'twitter:description',
                content: metaDescription
              }
            ]
              .concat(
                metaKeywords && metaKeywords.length > 0
                  ? {
                      name: 'keywords',
                      content: metaKeywords.join(', ')
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  metaKeywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
}

export default SEO
