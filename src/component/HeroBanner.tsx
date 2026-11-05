
import Link from "next/link";
import Image from "next/image";
import banner from "../assests/banner.png";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200">

<div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-purple-300/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-purple-200/80 text-purple-800 px-5 py-3 rounded-full font-semibold text-sm mb-8">
              <span className="text-lg">♥</span>
              Together for a Better Tomorrow
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-gray-950">
              Hand in Hand
              <br />
              for a{" "}
              <span className="text-purple-700">
                Stronger Community
              </span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Join HANDTOGETHER to support, volunteer, and create a positive
              impact together. Be part of something meaningful and help build
              a better tomorrow.
            </p>

          
            <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/upcomingevents"
                className="inline-flex items-center gap-3 bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-purple-300 transition duration-300 hover:-translate-y-1"
              >
                Explore Events <span>→</span>
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center border-2 border-purple-500 text-purple-700 hover:bg-purple-700 hover:text-white px-8 py-4 rounded-full font-bold transition duration-300"
              >
                Get Started Free
              </Link>
            </div>

      
            <div className="flex flex-wrap items-center gap-7 md:gap-9 mt-16">
              <div className="flex items-center gap-3">
                <div className="bg-white/70 p-3 rounded-full text-purple-700 text-2xl">
                  ♧
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-purple-800">10K+</h3>
                  <p className="text-sm text-gray-600">Volunteers</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-purple-300" />

              <div className="flex items-center gap-3">
                <div className="bg-white/70 p-3 rounded-full text-purple-700 text-2xl">
                  ▦
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-purple-800">5K+</h3>
                  <p className="text-sm text-gray-600">Events</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-purple-300" />

              <div className="flex items-center gap-3">
                <div className="bg-white/70 p-3 rounded-full text-purple-700 text-2xl">
                  ♥
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-purple-800">1M+</h3>
                  <p className="text-sm text-gray-600">Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>

      
          <div className="relative">
            <div className="absolute inset-5 bg-purple-300/40 rounded-full blur-2xl" />

            <div className="relative h-[350px] md:h-[480px] lg:h-[550px] rounded-[35px] overflow-hidden shadow-2xl shadow-purple-300/40">
              <Image
                src={banner}
                alt="People coming together as a community"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent" />

     
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-700 text-2xl">
                    ♥
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Together We Make a Difference
                    </h3>
                    <p className="text-sm text-gray-600">
                      Small acts. Big impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
