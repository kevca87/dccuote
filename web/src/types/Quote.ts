export type Character = {
  id: string;
  name: string;
}

export type Tag = {
  id: string;
  name: string;
}

export type Quote = {
  id: string;
  quote: string;
  character: Character;
  source: string;
  tags: Tag[];
};