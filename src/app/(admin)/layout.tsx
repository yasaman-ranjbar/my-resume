import React from 'react'
import Sidebar from '@/components/admin/Sidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">

            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-hidden  text-gray-800">
                    <header className="bg-[#F5F7FB] p-5 m-6 rounded-3xl">
                        <h1>Admin Dashboard</h1>
                    </header>
                    <div className='m-6 bg-[#F5F7FB] rounded-4xl'>{children}</div>

                </main>
            </div>
        </div>
    )
}

export default AdminLayout