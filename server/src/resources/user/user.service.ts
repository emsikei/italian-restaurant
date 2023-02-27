import UserModel from '@/resources/user/user.model';
import IUser from '@/resources/user/user.interface';
import { ResetPasswordToken, UserRegistration } from '@/utils/types';
import HttpException from '@/utils/exceptions/http.exception';

class UserService {
    private _userModel = UserModel;

    public findByEmail = async (email: string): Promise<IUser | null> => {
        const user = await this._userModel.findOne({ email });
        return user;
    };

    public findByToken = async (token: string): Promise<IUser | null> => {
        const user = await this._userModel.findOne({ 'token.value': token });
        return user;
    };

    public findById = async (id: string): Promise<IUser> => {
        const user = await this._userModel.findById(id);

        if (!user) throw HttpException.NotFound('USER_NOT_FOUND');

        return user;
    };

    public getAll = async () => {
        const users = await this._userModel.find({});
        return users;
    };

    public create = async (user: UserRegistration): Promise<IUser> => {
        const newUser = await this._userModel.create({
            ...user,
            roles: user.name === process.env.ADMIN_NAME ? ['ADMIN', 'USER'] : ['USER'],
        });
        return newUser;
    };

    public addToken = async (email: string, token: ResetPasswordToken): Promise<IUser | null> => {
        const user = await this._userModel.findOneAndUpdate({ email }, { $set: { token } }, { new: true });
        return user;
    };

    public resetPassword = async (
        hashedPassword: string,
        token: string,
        updatedToken: ResetPasswordToken
    ): Promise<void> => {
        const user = await this._userModel.findOneAndUpdate(
            { 'token.value': token },
            { $set: { token: updatedToken, password: hashedPassword } }
        );
    };

    public updatePassword = async (email: string, newPassword: string): Promise<IUser | null> => {
        const user = await this._userModel.findOneAndUpdate(
            { email },
            { $set: { password: newPassword } },
            { new: true }
        );

        return user;
    };
}

export default UserService;
