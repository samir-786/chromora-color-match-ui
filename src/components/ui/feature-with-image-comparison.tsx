
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

interface FeatureProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
  description?: string;
  badgeText?: string;
}

function Feature({ 
  beforeImage = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1920&h=1080&q=80",
  afterImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&h=1080&q=80",
  title = "AI Color Grading",
  description = "Transform your footage with intelligent color matching and professional-grade results.",
  badgeText = "Before & After"
}: FeatureProps) {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    setInset(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div>
          <Badge variant="secondary" className="bg-yellow-100 text-black border-yellow-200">
            {badgeText}
          </Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h3 className="text-2xl md:text-3xl tracking-tighter font-semibold text-teal-900">
            {title}
          </h3>
          <p className="text-base leading-relaxed tracking-tight text-gray-700">
            {description}
          </p>
        </div>
        <div className="pt-6 w-full">
          <div
            className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none shadow-2xl border"
            onMouseMove={onMouseMove}
            onMouseUp={() => setOnMouseDown(false)}
            onTouchMove={onMouseMove}
            onTouchEnd={() => setOnMouseDown(false)}
          >
            {/* Divider line with handle */}
            <div
              className="bg-white h-full w-1 absolute z-20 top-0 -ml-1 select-none shadow-lg"
              style={{
                left: inset + "%",
              }}
            >
              <button
                className="bg-white rounded-full hover:scale-110 transition-all w-8 h-8 select-none -translate-y-1/2 absolute top-1/2 -ml-4 z-30 cursor-ew-resize flex justify-center items-center shadow-lg border-2 border-yellow-400"
                onTouchStart={(e) => {
                  setOnMouseDown(true);
                  onMouseMove(e);
                }}
                onMouseDown={(e) => {
                  setOnMouseDown(true);
                  onMouseMove(e);
                }}
                onTouchEnd={() => setOnMouseDown(false)}
                onMouseUp={() => setOnMouseDown(false)}
              >
                <GripVertical className="h-4 w-4 select-none text-gray-600" />
              </button>
            </div>

            {/* After image (clipped) */}
            <img
              src={afterImage}
              alt="After color grading"
              className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none object-cover"
              style={{
                clipPath: "inset(0 0 0 " + inset + "%)",
              }}
            />

            {/* Before image (background) */}
            <img
              src={beforeImage}
              alt="Before color grading"
              className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none object-cover"
            />

            {/* Before/After labels */}
            <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs rounded-md shadow-lg font-medium">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 text-xs rounded-md shadow-lg font-medium">
              After
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
