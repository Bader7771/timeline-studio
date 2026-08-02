import frame01 from "../assets/transition-editorial/frame-01.webp";
import frame02 from "../assets/transition-editorial/frame-02.webp";
import frame03 from "../assets/transition-editorial/frame-03.webp";
import frame04 from "../assets/transition-editorial/frame-04.webp";
import frame05 from "../assets/transition-editorial/frame-05.webp";
import frame06 from "../assets/transition-editorial/frame-06.webp";
import frame07 from "../assets/transition-editorial/frame-07.webp";
import frame08 from "../assets/transition-editorial/frame-08.webp";
import frame09 from "../assets/transition-editorial/frame-09.webp";
import frame10 from "../assets/transition-editorial/frame-10.webp";
import frame11 from "../assets/transition-editorial/frame-11.webp";
import frame12 from "../assets/transition-editorial/frame-12.webp";

const images = [
  { src: frame01, alt: "Solitary figure beneath monumental concrete ramps", width: 2200, height: 2580, ratio: "4 / 5", position: "50% 68%", sourceUrl: "https://unsplash.com/photos/1S8kWIyisNY", creator: "Giuseppe Argenziano" },
  { src: frame02, alt: "Motion-soft profile of a fashion model", width: 1800, height: 2574, ratio: "3 / 4", position: "58% 45%", sourceUrl: "https://unsplash.com/photos/E3nJTkw0MWw", creator: "Karsten Winegeart" },
  { src: frame03, alt: "Face crossed by a narrow beam of light", width: 2200, height: 1467, ratio: "3 / 2", position: "55% 50%", sourceUrl: "https://unsplash.com/photos/zG87D_xiAVQ", creator: "Leonardo Iribe" },
  { src: frame04, alt: "Ornate illuminated architecture beneath a night sky", width: 2200, height: 4400, ratio: "2 / 3", position: "50% 84%", sourceUrl: "https://unsplash.com/photos/RdMefFSheyw", creator: "Kenny" },
  { src: frame05, alt: "Distant silhouettes moving through dense fog", width: 2200, height: 3300, ratio: "4 / 5", position: "50% 69%", sourceUrl: "https://unsplash.com/photos/NCuElPYwsdY", creator: "Sudhan Chitgopkar" },
  { src: frame06, alt: "Ghostlike hand hovering over a dark surface", width: 2200, height: 1469, ratio: "3 / 2", position: "40% 52%", sourceUrl: "https://unsplash.com/photos/PSwUqfsGF4g", creator: "Liana S" },
  { src: frame07, alt: "Blurred fashion portrait with repeated facial movement", width: 1800, height: 2700, ratio: "3 / 4", position: "50% 43%", sourceUrl: "https://unsplash.com/photos/b9lNdKK-2B8", creator: "Monika Schlarman" },
  { src: frame08, alt: "Dark profile dissolving into horizontal motion", width: 1800, height: 2700, ratio: "2 / 3", position: "52% 35%", sourceUrl: "https://unsplash.com/photos/xI2rnHYHtAQ", creator: "Isaac Quesada" },
  { src: frame09, alt: "Surreal double-exposure portrait covered in fine strands", width: 1800, height: 1200, ratio: "1 / 1", position: "50% 45%", sourceUrl: "https://unsplash.com/photos/f3tWX0XNuhU", creator: "Sebastian Schuster" },
  { src: frame10, alt: "Angular monumental building viewed from below", width: 1800, height: 1200, ratio: "16 / 9", position: "52% 57%", sourceUrl: "https://unsplash.com/photos/HSFTqNF4Wa0", creator: "Max Langelott" },
  { src: frame11, alt: "Grainy blurred silhouette crossing a bright landscape", width: 1800, height: 2700, ratio: "4 / 5", position: "53% 54%", sourceUrl: "https://unsplash.com/photos/a8nEiPpK7uk", creator: "PEAR" },
  { src: frame12, alt: "Extreme close-up of palm lines emerging from shadow", width: 1800, height: 2700, ratio: "2 / 3", position: "39% 48%", sourceUrl: "https://unsplash.com/photos/Tx2PKB3mFtQ", creator: "Andrey Soldatov" },
].map((image, index) => ({
  ...image,
  id: `frame-${String(index + 1).padStart(2, "0")}`,
  eager: index < 4,
  mobile: ![2, 5, 8, 11].includes(index),
  displayHeight: [0.76, 0.68, 0.62, 0.72, 0.66, 0.64, 0.82, 0.7, 0.88, 0.65, 0.74, 0.68][index],
  license: "Unsplash License — production approved",
}));

const text = (value) => ({ type: "text", value });
const image = (index) => ({ type: "image", ...images[index] });

export const transitionEditorialTracks = [
  [text("FASHION FILMS,"), image(0), text("MUSIC VIDEOS,"), image(6), text("BRAND STORIES,"), image(2), text("SHORT FILMS,")],
  [text("COMMERCIALS,"), image(3), text("DOCUMENTARIES,"), image(4), text("SOCIAL CUTS,"), image(9), text("SOUND DESIGN, CAMPAIGNS,")],
  [text("EDITING, RHYTHM,"), image(1), text("COLOR,"), image(8), text("SOUND, MOVEMENT,"), image(10), text("MEMORY, FRAME BY FRAME")],
  [text("VISUAL STORIES,"), image(7), text("CAMPAIGNS,"), image(5), text("EDITING, MOVEMENT,"), image(11), text("CUT AFTER CUT")],
];
