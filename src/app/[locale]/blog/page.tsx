import { type Locale } from '@/i18n-config';
import { getBlogContent } from '@/lib/api';

import { Heading } from '@/components/atoms/heading';

interface Props {
  params: { locale: Locale };
}

export default async function Page({ params }: Props) {
  const content = await getBlogContent(params.locale);

  return (
    <section className="w-full p-5">
      <div className="w-full max-w-7xl mx-auto">
        <Heading>{content.heading}</Heading>
      </div>
    </section>
  );
}
