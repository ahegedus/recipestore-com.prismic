import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="es-bounded es-fullpage-hero"
    >
      <div
        className={`
          flex flex-col gap-8
          ${slice.variation === "imageRight" ? "lg:flex-row-reverse" : "lg:flex-row"}
        `}
      >
        <div>
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              field={slice.primary.image}
              className="max-w-full h-auto self-center"
            />
          )}
        </div>

        <div className="flex flex-col justify-around p-6 lg:w-1/2">
          <div className="grid gap-4">
            {isFilled.keyText(slice.primary.eyebrowHeadline) && (
              <p className="text-teal-500 text-lg font-medium m-0">
                {slice.primary.eyebrowHeadline}
              </p>
            )}
            {isFilled.richText(slice.primary.title) && (
              <div className="text-2xl font-bold lg:text-3xl xl:text-4xl">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
            {isFilled.richText(slice.primary.description) && (
              <div className="text-lg max-w-3xl xl:text-xl">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
            <PrismicNextLink
              className="self-start rounded-md text-sm leading-5 px-6 py-4 transition bg-teal-700 text-white hover:bg-teal-800"
              field={slice.primary.callToActionLink}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
