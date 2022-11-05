import IUser from "./User";

export default interface IOrganization extends IUser {
      name: string;
      summary: string;
}