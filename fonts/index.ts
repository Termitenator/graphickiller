import localFont from "next/font/local";

export const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/neue-montreal/PPNeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-montreal/PPNeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-montreal/PPNeueMontreal-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-montreal/PPNeueMontreal-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});
