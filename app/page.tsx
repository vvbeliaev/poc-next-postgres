import Link from 'next/link';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export default async function Home() {
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
      revalidatePath('/isr');
    } catch (e) {
      console.error('Failed to add post:', e);
    }
  }

  return (
    <main className="min-h-screen p-12 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
            Next.js + Prisma PoC
          </h1>
          <p className="text-lg text-gray-600">
            Demonstrating SSR, ISR, and the &quot;SSG Hack&quot;.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/ssr" 
            className="group block p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">SSR Route →</h3>
            <p className="text-gray-500">Always fresh, fetched from DB on every request.</p>
          </Link>

          <Link 
            href="/isr" 
            className="group block p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-600">ISR Route →</h3>
            <p className="text-gray-500">Cached with 1h TTL. Uses the build-time &quot;skip DB&quot; hack.</p>
          </Link>
        </section>

        <section className="bg-white p-8 border rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Add Data</h2>
          <form action={addPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                name="title" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Post title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea 
                name="content" 
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Post content (optional)"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Add Post
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
