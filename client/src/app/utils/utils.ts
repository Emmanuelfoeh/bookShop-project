// interface Book {
//   id?: string;
//   _id?: string;
//   title: string;
//   description: string;
//   quantity: number;
//   picture: string;
//   __v: number;
// }


 export const transformImagePath = (absolutePath: string): string => {
  const parts = absolutePath.split(/\\/g);
  const filename = parts[parts.length - 1];
  return `/images/${filename}`;
};

export const transformBookData = (books: any[]): any[] => {
  return books.map((book) => ({
    ...book,
    picture: book.picture ? transformImagePath(book.picture) : "",
  }));
};
