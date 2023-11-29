import { env } from '@/env.mjs';

import type { Content } from '@/components/atoms/markdown';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: { url: string };
  content: Content;
};

async function fetchGraphQL(query: string) {
  return fetch(`https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: { tags: ['contentful'] },
  }).then(response => response.json());
}

export async function getHomePageContent(locale: string) {
  const response = await fetchGraphQL(
    `query {
      homePageCollection(locale: "${locale}", limit: 1) {
        items {
          title
          description
        }
      }
    }`,
  );

  return response?.data?.homePageCollection?.items[0];
}

export async function getBlogContent(locale: string) {
  const response = await fetchGraphQL(
    `query {
      blogCollection(locale: "${locale}", limit: 1) {
        items {
          heading
        }
      }
    }`,
  );

  return response?.data?.blogCollection?.items[0];
}

export async function getAllPosts(locale: string): Promise<Omit<Post, 'content'>[]> {
  const response = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, locale: "${locale}", order: date_DESC) {
        items {
          slug
          title
          date
          coverImage {
            url
          }
          excerpt
        }
      }
    }`,
  );

  return response?.data?.postCollection?.items;
}

export async function getPost(locale: string, slug: string): Promise<Omit<Post, 'excerpt'>> {
  const response = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, locale: "${locale}", limit: 1) {
        items {
          slug
          title
          date
          coverImage {
            url
          }
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  description
                }
              }
            }
          }
        }
      }
    }`,
  );

  return response?.data?.postCollection?.items[0];
}
