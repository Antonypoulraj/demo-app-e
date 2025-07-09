import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20 font-sans">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-mono leading-6">
          <li className="mb-2 tracking-tight">
            Get started by editing{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 font-mono font-semibold dark:bg-white/10">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-tight">Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="flex h-10 w-full items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/20 dark:hover:bg-[#1a1a1a] sm:h-12 sm:w-auto sm:px-5 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
