import NotesClient from "./Notes.client";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function NotesByTag({ params }: Props) {
  const resolvedParams = await params; 
  const slug = resolvedParams.slug || [];
  const tag =
    slug[0] && slug[0] !== 'all'
      ? slug[0][0].toUpperCase() + slug[0].slice(1)
      : undefined;

  return <NotesClient tag={tag} />;
}