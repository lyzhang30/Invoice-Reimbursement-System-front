const color = [
  "red",
  "sky",
  "yellow",
  "violet",
  "teal",
  "gray",
  "lime",
  "orange",
  "zinc",
  "pink",
  "blue",
  "indigo",
];

export default function RandomColor() {
  //   return color[id % 12];
  return color[Math.floor(Math.random() * 10)];
}
