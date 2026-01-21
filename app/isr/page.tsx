import Link from 'next/link';

import { prisma } from '@/lib/prisma';

export const revalidate = 60 * 60 * 24; // 24 hours

async function getPosts() {
  // SSG Hack: If we are in build time and don't want to connect to DB,
  // or if the DB connection fails, we return an empty array.
  // Next.js will still generate a static page with this empty data.
  // In runtime, the first request will trigger a background revalidation.
  try {
    // We can also use an environment variable to explicitly skip during build
    if (process.env.IS_BUILD_TIME === 'true') {
      console.log('Skipping DB query during build time...');
      return [];
    }
    
    return await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('ISR Page: Failed to fetch posts from DB (expected during build if DB is offline):', error);
    return [];
  }
}

export default async function ISRPage() {
  const posts = await getPosts();
  const renderedAt = new Date().toLocaleString();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ISR Route (SSG Hack)</h1>
      <p className="mb-2 text-gray-600">
        This page has a revalidate period of 3600s.
      </p>
      <p className="mb-4 text-sm text-amber-600 bg-amber-50 p-2 border border-amber-200 rounded">
        <strong>Hack details:</strong> During `next build`, the DB query is skipped (or allowed to fail) returning an empty list. 
        The first request in runtime will trigger a background revalidation to fetch real data from the DB.
      </p>
      
      <p className="mb-4 font-mono text-xs">Page generated at: {renderedAt}</p>
      
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-gray-50 p-10 text-center border-2 border-dashed rounded">
            <p className="text-gray-500 italic">No posts yet or currently revalidating...</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                Created at: {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
