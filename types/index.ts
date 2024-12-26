export interface Technology {
  id: string;
  title: string;
  year: number;
  preferred: number;
}

export interface ConfigInURL {
  name?: string;
  positionName?: string;
  technologies?: Technology["id"][];
  isFrontEndPosition?: boolean;
  isInternational?: boolean;
}

export interface EncryptedData {
  iv: string;
  content: string;
}
