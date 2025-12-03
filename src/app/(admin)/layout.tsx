import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
        <header className="bg-slate-900 text-white p-4">
            <h1>Admin Dashboard</h1>
        </header>
        <div className="flex flex-1">
            <aside className="w-64 bg-slate-100 p-4 border-r">
                <nav>
                    <ul>
                        <li><a href="/admin" className="block py-2">Dashboard</a></li>
                        <li><a href="/admin/posts" className="block py-2">Posts</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    </div>
  )
}

export default AdminLayout