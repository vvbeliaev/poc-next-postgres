import Link from 'next/link';

import { prisma } from '@/lib/prisma';

async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function SSGPage() {
  const posts = await getPosts();
  const renderedAt = new Date().toLocaleString();

  return (
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 mb-12">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 mb-6 transition-colors group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">SSG Route</h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Static Site Generation for absolute reliability.</p>
            </div>
            <div className="px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-full">
              <span className="text-amber-700 dark:text-amber-300 text-sm font-bold tracking-wide uppercase">Static Build • No TTL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10 flex gap-4">
            <div className="text-blue-500 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-1">Architecture Note: Runtime Consistency</h4>
              <p className="text-blue-800/80 dark:text-blue-400/70 text-sm leading-relaxed text-balance">
                This page is generated once during `next build`. Since the database is now accessible at build time, 
                all current posts are baked into the HTML for instant delivery.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] uppercase tracking-tighter text-blue-200 dark:text-blue-900/30 font-bold select-none leading-none">
            Page generated at: <br/> {renderedAt}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.length === 0 ? (
            <div className="col-span-full py-20 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center">
              <div className="mb-4 inline-flex p-4 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No posts found</h3>
              <p className="text-slate-500 dark:text-slate-400">No posts were present in the database during the build process.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{post.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{post.content}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-wider">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-slate-300 dark:text-slate-600">ID: {post.id.toString().slice(0, 8)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
