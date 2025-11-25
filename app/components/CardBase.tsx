type CardBaseProps = {
    img?: string,
    title: string,
    description?: string
}

export default function CardBase({img, title, description}: CardBaseProps) {
  return (
    <div className="w-full bg-white rounded overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        {/* Ảnh nền */}
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="bg-cover bg-center w-full h-full transform transition-transform duration-500 hover:scale-105"
        ></div>

        {/* Overlay gradient đen mờ dần từ trên xuống dưới */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70 pointer-events-none"></div>
      </div>

        <div className='p-6'>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 relative z-10">{title}</h2>
            <p className='text-sm text-gray-500'>{description}</p>
        </div>

    </div>
  );
}
