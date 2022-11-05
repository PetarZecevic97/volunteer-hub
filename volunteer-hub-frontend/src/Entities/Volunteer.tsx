import IUser from "./User";

export default interface IVolunteer extends IUser {
      id: number;
      username: string;
      password: string;
      email: string;
      isAdmin: boolean;
}