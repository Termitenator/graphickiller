interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  className?: string;
}

export default function ProjectCard({
  title,
  category,
  imageUrl,
  className = "",
}: ProjectCardProps) {
  return (
    <div
      className={`group relative overflow-hidden bg-white/5 cursor-pointer ${className}`}>
      {/* 
        Catatan: Di Next.js disarankan pakai <Image src={...} fill alt={title} /> 
        Untuk sementara kita pakai tag img standar yang diobject-cover 
      */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Overlay gradien halus agar teks terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Teks Info Proyek */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-bold tracking-widest text-white/70 uppercase mb-2 block font-neue">
          {category}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white font-neue">
          {title}
        </h3>
      </div>
    </div>
  );
}
