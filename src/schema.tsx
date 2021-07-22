export interface optionType {
  text: string;

}

export interface questionType {
  id: string;
  episodeId: string;
  time: number; // seconds
  prompt: string;
  options: optionType[];
  numShards?: number;
  shards?: {
    [key: string]: {
      [key: string]: number; // count
    };
  };
}

export interface episodeType {
  id: string;
  videoId: string;
  title: string;
  date: Date;
  thumbHigh?: string;
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
  id: string;
  episodeId: string;
  questionId: string;
  uid: string;
  option: RESPONSE;
  date: Date;
}
