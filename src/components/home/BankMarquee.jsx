import Image from "next/image";
import Marquee from "react-fast-marquee";
import { bankLogos } from "../../lib/helper";

export default function BankMarquee() {
    return (
    <section className="w-full bg-white py-8 relative overflow-hidden">
        {/* Optional Side Fades */}
        <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* The Package Marquee */}
        <Marquee 
            speed={50}           // Speed of the marquee (pixels per second)
            pauseOnHover={true}  // Pauses animation when user hovers over a logo
            gradient={false}     // The package has built-in gradients, but setting to false lets us use our custom Tailwind ones above
        >
            {bankLogos.map((logo, i) => (
            <div 
                key={i} 
                className="relative h-12 w-36 mx-12 shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
                <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 768px) 100vw, 150px" // Responsive sizes for better performance
                className="object-contain"
                />
            </div>
            ))}
        </Marquee>
    </section>
    )
}