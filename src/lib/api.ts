import { env } from '@/env.mjs';

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
