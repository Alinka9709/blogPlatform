export interface IFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmpasword: string;
  img: string;
}
export interface IFormArtickeInputs {
  title: "string";
  description: "string";
  body: "string";
  tagList?: ["string"];
  tag?: string;
  slug?: any;
}
