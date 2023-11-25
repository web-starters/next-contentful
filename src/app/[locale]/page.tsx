import { type Locale } from '@/i18n-config';
import { getHomePageContent } from '@/lib/api';

import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';

interface Props {
  params: { locale: Locale };
}

export default async function Page({ params }: Props) {
  const content = await getHomePageContent(params.locale);

  return (
    <section className="w-full p-5">
      <div className="w-full max-w-7xl mx-auto">
        <Heading>{content.title}</Heading>

        <Text>{content.description}</Text>
      </div>
    </section>
  );
}
