export interface optionType {
  text: string;
}

export interface questionType {
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
  questions: questionType[];
}


export enum RESPONSE {
  BLANK = -1,
  THIS = 0,
  THAT = 1,
  OTHER = 2,
  OTHEROTHER = 3,
}
