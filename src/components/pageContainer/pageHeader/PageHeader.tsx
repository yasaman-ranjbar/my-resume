import { PageHeaderProps } from "./type"

const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <div className="min-h-[300px] flex items-center justify-center bg-black text-white">
            <h1 className="text-4xl font-bold">{title}</h1>
        </div>
    )
}

export default PageHeader