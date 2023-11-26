import { type Locale } from '@/i18n-config';
import { getAllPosts, getPost } from '@/lib/api';

import { Heading } from '@/components/atoms/heading';

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
  const content = await getPost(params.locale, params.slug);

  return (
    <section className="w-full p-5">
      <div className="w-full max-w-7xl mx-auto">
        <Heading>{content.title}</Heading>
      </div>
    </section>
  );
}
