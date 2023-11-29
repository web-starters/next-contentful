import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Document } from '@contentful/rich-text-types';

type Asset = {
  sys: { id: string };
  url: string;
  description: string;
};

export type Content = {
  json: Document;
  links: { assets: { block: Asset[] } };
};

interface RichTextAssetProps {
  id: string;
  assets: Asset[];
}

interface MarkdownProps {
  content: Content;
}

function RichTextAsset({ id, assets }: RichTextAssetProps) {
  const asset = assets?.find(asset => asset.sys.id === id);

  if (asset?.url) return <Image src={asset.url} layout="fill" alt={asset.description} />;

  return null;
}

export function Markdown({ content }: MarkdownProps) {
  return documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => (
        <RichTextAsset id={node.data.target.sys.id} assets={content.links.assets.block} />
      ),
    },
  });
}
