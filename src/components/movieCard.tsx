export default function MovieCard({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div className="bg-white shadow-md rounded-md p-4 border">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    );
  }
  