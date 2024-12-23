export interface Technology {
  id: string;
  year: number;
}

export interface ConfigInURL {
  name?: string;
  technologies?: Technology["id"][];
}

export interface EncryptedData {
  iv: string;
  content: string;
}
