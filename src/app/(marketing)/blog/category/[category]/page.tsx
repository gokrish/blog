import { getPostsByCategory, getAllCategories } from "@/lib/mdx";
import LatestArticles from "@/components/home/LatestArticles";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${categoryName} Articles | Gopikrishna AI Security`,
    description: `Read the latest articles on ${categoryName}.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const posts = getPostsByCategory(resolvedParams.category.replace(/-/g, " "));

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-8 capitalize">{resolvedParams.category.replace(/-/g, " ")}</h1>
        <p className="text-muted-foreground">No articles found in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl font-bold capitalize">{resolvedParams.category.replace(/-/g, " ")}</h1>
      </div>
      <LatestArticles posts={posts} />
    </div>
  );
}
