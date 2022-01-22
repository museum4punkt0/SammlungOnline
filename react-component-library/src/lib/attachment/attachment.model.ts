export interface ILicense {
  text?: string;
  href?: string;
  target?: string;
}

export interface IAttachment {
  src: string;
  filename: string;
  downloadFilename: string;
  credits: string;
  primary: boolean;
  license?: ILicense;
}
