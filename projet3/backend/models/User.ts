import mongoose, {Document, Schema} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser extends Document {
    googleId?: string;
    githubId?: string;
    localId?: string;
    displayName: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, unique: false, sparse: true},
    githubId: { type: String, unique: false, sparse: true},
    localId: { type: String, unique: false, sparse: true},
    email: { type: String, unique: false, sparse: true},
    displayName: {type: String, required: true},
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'username', // tu peux mettre 'email' si tu veux que l'identifiant soit l'email
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
