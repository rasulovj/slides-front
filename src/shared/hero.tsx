"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex items-center justify-center min-h-screen w-full bg-white overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
          `,
        }}
      />

      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          {t("hero.title")}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href={"/workspace/slides"}>
            <Button className="p-6">{t("hero.getStarted")}</Button>
          </Link>
          <Link href={"/workspace/slides"}>
            <Button variant={"outline"} className="p-6">
              {t("hero.learnMore")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
