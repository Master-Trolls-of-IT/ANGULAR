export type APIResponseInterface = {
  photos: Photo[];
};

export type Photo = {
  id: number;
  src: { original: string };
  alt: string;
};
