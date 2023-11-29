import { getAllPosts, getPost } from '@/lib/api';
import { type Locale } from '@/i18n-config';

import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { Markdown } from '@/components/atoms/markdown';
import { ContentfulImage } from '@/components/atoms/contentful-image';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts('en-US');

  return allPosts.map(post => ({ slug: post.slug }));
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.locale, params.slug);

  return (
    <section className="w-full p-5">
      <div className="w-full max-w-7xl mx-auto">
        <Heading>{post.title}</Heading>

        <Text>{post.date}</Text>

        <ContentfulImage
          className="my-8 rounded-md"
          src={post.coverImage.url}
          width={2000}
          height={1000}
          alt={post.title}
          priority
        />

        <Markdown content={post.content} />
      </div>
    </section>
  );
}
