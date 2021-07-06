export interface optionType {
  text: string;
}

export interface questionType {
  episodeId: string;
  time: number; // seconds
  prompt: string;
  options: optionType[];
}

export interface episodeType {
  id?: string;
  videoId: string;
  title: string;
  date: Date;
  thumbnail?: string;
  questions: string[]; // question Ids
}


export enum RESPONSE {
  BLANK = -1,
  THIS = 0,
  THAT = 1,
  OTHER = 2,
  OTHEROTHER = 3,
}


export interface responseType {
  episode: string;
  question: string;
  uid: string;
  option: RESPONSE;
  date: Date;
}
