export default interface AuthContextData {
  signed: boolean;
  token: string;
  user: any;
  signIn: (myToken: string, user: Object) => void;
  signOut: () => void;
  setToken: (myToken: string) => void;
  loged: boolean;
}
