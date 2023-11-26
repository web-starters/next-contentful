import { env } from '@/env.mjs';

export type Post = {
  slug: string;
  title: string;
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

export async function getAllPosts(locale: string): Promise<Post[]> {
  const response = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, locale: "${locale}", order: date_DESC) {
        items {
          slug
          title
        }
      }
    }`,
  );

  return response?.data?.postCollection?.items;
}

export async function getPost(locale: string, slug: string): Promise<Post> {
  const response = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, locale: "${locale}", limit: 1) {
        items {
          slug
          title
        }
      }
    }`,
  );

  return response?.data?.postCollection?.items[0];
}
