import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <main className="min-h-screen flex flex-col">
      <section className="py-8 w-full max-w-[768px] mx-auto">
        <div className="bg-neutral-800 p-4 rounded-md shadow-md"> 
          {children}
        </div>
      </section>
    </main>
  )
}