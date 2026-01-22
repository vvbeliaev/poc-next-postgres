import Link from 'next/link';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

async function addPost(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title) return;

  try {
    await prisma.post.create({
      data: { title, content },
    });
    revalidatePath('/');
    revalidatePath('/ssr');
    revalidatePath('/ssg');
  } catch (e) {
    console.error('Failed to add post:', e);
  }
}

export default async function Home() {

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:mask[:linear-gradient(0deg,rgba(2,6,23,1),rgba(2,6,23,0.5))]"></div>
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Next.js <span className="text-blue-600">Postgres</span> PoC
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A high-performance boilerplate demonstrating SSR, SSG, and optimized database interactions with Prisma.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link 
            href="/ssr" 
            className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">Server-Side</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">SSR Route</h3>
            <p className="text-slate-500 dark:text-slate-400">Real-time data synchronization. Always fresh, fetched from DB on every request.</p>
          </Link>

          <Link 
            href="/ssg" 
            className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-amber-500 transition-colors">Static Generation</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">SSG Route</h3>
            <p className="text-slate-500 dark:text-slate-400">Pre-rendered at build time. Ultra-fast delivery of content from the edge.</p>
          </Link>
        </section>

        <section className="bg-white dark:bg-slate-900 p-10 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white text-center">Submit New Entry</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-center max-w-md mx-auto">Add new data to the PostgreSQL database to test revalidation flows across different rendering strategies.</p>
            
            <form action={addPost} className="max-w-xl mx-auto space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Title</label>
                <input 
                  name="title" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" 
                  placeholder="Enter a descriptive title..."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Content</label>
                <textarea 
                  name="content" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none" 
                  placeholder="Write something interesting here (optional)..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 px-6 rounded-xl hover:shadow-lg transition-all font-bold text-lg"
              >
                Create Post
              </button>
            </form>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </section>
      </div>
    </main>
  );
}
