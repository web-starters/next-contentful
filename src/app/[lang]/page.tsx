import { draftMode } from 'next/headers';

import { type Locale } from '@/i18n-config';
import { getHomePageContent } from '@/lib/api';

import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';

interface Props {
  params: { lang: Locale };
}

export default async function Page({ params }: Props) {
  const { isEnabled } = draftMode();
  const content = await getHomePageContent(params.lang, isEnabled);

  return (
    <div>
      <Heading>{content.title}</Heading>

      <Text>{content.description}</Text>
    </div>
  );
}
