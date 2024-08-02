export interface AllFilesResponse {
  status: string;
  urls: Url[];
}

export interface Url {
  fileName: string;
  url: string;
}
