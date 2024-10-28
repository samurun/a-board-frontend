export default function PostContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <article className='space-y-2'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='mt-0'>{content}</p>
    </article>
  );
}
