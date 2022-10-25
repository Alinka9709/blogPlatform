export interface IFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmpasword: string;
  img: string;
}
export interface IFormArtickeInputs {
  title: string;
  description: string;
  body: string;
  tag?: { value: string }[];
  a?: string[];
  slug?: string;
  token: string | null;
}
