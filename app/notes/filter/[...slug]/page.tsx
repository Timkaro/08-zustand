import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];

  return {
    title: category,
    description: `Category: ${category}`,
    openGraph: {
      title: category,
      description: `Category: ${category}`,
      url: "https://08-zustand-lyart.vercel.app/notes/filter/{slug}",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Category: ${category}`,
        },
      ],
    },
  };
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const data = await fetchNotes("", 1, 9, category);

  return <NotesClient initialData={data} tag={category} />;
}
