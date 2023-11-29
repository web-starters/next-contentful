import Link from 'next/link';

import { type Locale } from '@/i18n-config';
import { getAllPosts, getBlogContent } from '@/lib/api';

import { Heading, HeadingTypeEnum } from '@/components/atoms/heading';
import { ContentfulImage } from '@/components/atoms/contentful-image';

interface Props {
  params: { locale: Locale };
}

export default async function Page({ params }: Props) {
  const content = await getBlogContent(params.locale);
  const allPosts = await getAllPosts(params.locale);

  return (
    <section className="w-full p-5">
      <div className="w-full max-w-7xl mx-auto">
        <Heading>{content.heading}</Heading>

        <div className="grid grid-cols-3 gap-5">
          {allPosts.map(post => (
            <Link key={post.slug} href={`/${params.locale}/blog/${post.slug}`}>
              <div>
                <ContentfulImage
                  className="mb-2 rounded-md"
                  src={post.coverImage.url}
                  width={400}
                  height={200}
                  alt={post.title}
                  priority
                />

                <Heading type={HeadingTypeEnum.H4} size="xs">
                  {post.title}
                </Heading>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
