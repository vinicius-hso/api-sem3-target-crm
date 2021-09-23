export default interface AuthContextData {
  signed: boolean;
  token: string;
  signIn: (myToken: string) => void;
  signOut: () => void;
  setToken: (myToken: string) => void;
}
