export type optionType = {
  text: string;
}

export type questionType = {
  time: number; // seconds
  prompt: string;
  options: optionType[];
}

export type episodeType = {
  videoId: string;
  questions: questionType[];
}


export enum RESPONSE {
  BLANK = -1,
  THIS = 0,
  THAT = 1,
  OTHER = 2,
  OTHEROTHER = 3,
}

