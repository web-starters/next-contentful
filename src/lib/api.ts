import { env } from '@/env.mjs';

async function fetchGraphQL(query: string, preview = false) {
  return fetch(`https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({ query }),
  }).then(response => response.json());
}

export async function getHomePageContent(locale: string, isDraftMode: boolean) {
  const response = await fetchGraphQL(
    `query {
      homePageCollection(locale: "${locale}", limit: 1, preview: ${isDraftMode.toString()}) {
        items {
          title
          description
        }
      }
    }`,
    isDraftMode,
  );

  return response?.data?.homePageCollection?.items[0];
}
