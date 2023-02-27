import IUser from '@/resources/user/user.interface';
import { Role } from '@/utils/types';

export default class UserDto {
    public id: string;

    public email: string;

    public name: string;

    public roles: Role[];

    constructor(user: IUser) {
        this.id = user._id.toString();
        this.email = user.email;
        this.name = user.name;
        this.roles = user.roles;
    }
}
