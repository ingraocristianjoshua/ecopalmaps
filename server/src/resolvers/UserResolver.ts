import { User } from "../entities/User";
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import { MyContext } from "../types";
import { sendRefreshToken } from "../auth/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth/auth";
import { verify } from "jsonwebtoken";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

@ObjectType()
class FieldError {
    @Field({ nullable: true })
    field?: string;

    @Field()
    message: string;
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => String, { nullable: true })
    accessToken?: string;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    me(@Ctx() context: MyContext) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );
            return User.findOne({ where: { id: payload.id } });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Mutation(() => UserResponse, { nullable: true })
    async login(
        @Arg("input") input: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let accessToken;
        let status;

        if (input.includes("@")) {
            user = await User.findOne({ where: { email: input } });
        } else {
            user = await User.findOne({ where: { username: input } });
        }

        if (!user) {
            errors.push({
                field: "input",
                message: "Non esiste un account con queste credenziali",
            });
        } else {
            const valid = await argon2.verify(user.password, password);

            if (!valid) {
                errors.push({
                    field: "password",
                    message: "Password errata",
                });
            } else {
                if (user.verified) {
                    sendRefreshToken(res, createRefreshToken(user));
                    accessToken = createAccessToken(user);
                    status = "Hai effettuato l'accesso.";
                } else {
                    status =
                        "Il tuo indirizzo email non è verificato. Ti abbiamo appena inviato una email contenente le istruzioni per la verifica.";
                    const verifyToken = createAccessToken(user);
                    sendVerificationEmail(user.email, verifyToken);
                }
            }
        }

        return {
            user,
            errors,
            accessToken,
            status,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    async signup(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("password") password: string,
        @Arg("title") title: string,
        @Arg("gender") gender: string,
        @Arg("birthDate") birthDate: Date
    ): Promise<UserResponse> {
        let errors = [];

        if (!email.includes("@")) {
            errors.push({
                field: "email",
                message: "Indirizzo email non valido",
            });
        }
        if (username.includes("@")) {
            errors.push({
                field: "username",
                message: "Lo username non può contenere @",
            });
        }
        if (username.length <= 2) {
            errors.push({
                field: "username",
                message: "La lunghezza dello username deve essere maggiore di 2",
            });
        }
        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "La lunghezza della password deve essere maggiore di 2",
            });
        }
        if (firstName == "" || firstName == null) {
            errors.push({
                field: "firstName",
                message: "Il campo del nome non può essere vuoto",
            });
        }
        if (lastName == "" || lastName == null) {
            errors.push({
                field: "lastName",
                message: "Il campo del cognome non può essere vuoto",
            });
        }
        if (title == "Titolo" || title == "") {
            errors.push({
                field: "title",
                message: "Il campo del titolo non può prendere questo valore",
            });
        }
        if (gender == "Gender" || gender == "") {
            errors.push({
                field: "gender",
                message: "Il campo del genere non può prendere questo valore",
            });
        }

        let user;
        let status;
        const hashedPassword = await argon2.hash(password);

        if (errors.length === 0) {
            try {
                const result = await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({
                        username: username,
                        email: email,
                        password: hashedPassword,
                        firstName: firstName,
                        lastName: lastName,
                        title: title,
                        gender: gender,
                        birthDate: birthDate,
                        verified: false,
                    })
                    .returning("*")
                    .execute();
                user = result.raw[0];
                const token = createAccessToken(user);
                sendVerificationEmail(email, token);
                status =
                    "Controlla la tua posta elettronica, ti abbiamo appena inviato una email contenente le istruzioni per la verifica del tuo indirizzo email.";
            } catch (error) {
                console.log(error);

                if (error.detail.includes("username")) {
                    errors.push({
                        field: "username",
                        message: "Questo username è stato già preso",
                    });
                }
                if (error.detail.includes("email")) {
                    errors.push({
                        field: "email",
                        message: "Esiste già un utente che utilizza questo indirizzo email",
                    });
                }
            }
        }

        return {
            user,
            errors,
            status,
        };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: MyContext) {
        sendRefreshToken(res, "");

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("id", () => Number) id: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id: id }, "tokenVersion", 1);

        return true;
    }

    @Mutation(() => UserResponse)
    async verifyEmailAddress(
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let status = "";

        try {
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );
            await User.update(
                {
                    id: payload.id,
                },
                {
                    verified: true,
                }
            );
            status = "Il tuo indirizzo email è stato verificato. Adesso puoi effettuare l'accesso.";
        } catch (error) {
            console.error(error);
            status =
                "C'è stato un errore. Per favore, effettua di nuovo l'operazione per la verifica dell'indirizzo email.";
        }

        return { status };
    }

    @Mutation(() => UserResponse)
    async sendRecoverEmail(@Arg("email") email: string): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let errors = [];
        let user;
        let status = "";

        if (!email.includes("@")) {
            errors.push({
                field: "email",
                message: "Indirizzo email non valido",
            });
        } else {
            user = await User.findOne({ where: { email } });

            if (!user) {
                errors.push({
                    field: "email",
                    message:
                        "Questo indirizzo email non è associato ad alcun account",
                });
            } else {
                const token = createAccessToken(user);
                const link = `${process.env.CORS_ORIGIN}/modify-password/${token}`;

                try {
                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/RecoverEmail.ejs"
                        ),
                        { link: link },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                transporter.sendMail({
                                    from: "EcoPalMaps <support@ecopalmaps.com>",
                                    to: email,
                                    subject: "Recupera la tua password",
                                    html: data,
                                });
                                status =
                                    "Controlla la tua posta elettronica, ti abbiamo appena inviato una email contenente le istruzioni per il recupero della tua password.";
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    errors.push({
                        field: "email",
                        message:
                            "Non è stato possibile inviare l'email, controlla la tua connessione ad internet",
                    });
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => UserResponse)
    async notAuthModifyPassword(
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let errors = [];

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "La lunghezza della password deve essere maggiore di 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "La lunghezza della password di conferma deve essere maggiore di 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "Le due password non coincidono",
                },
                {
                    field: "confirmPassword",
                    message: "Le due password non coincidono",
                }
            );
        }

        let status = "";

        if (errors.length === 0) {
            try {
                const payload: any = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET!
                );
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status = "La password è stata cambiata. Adesso puoi effettuare l'accesso.";
            } catch (error) {
                status =
                    "C'è stato un errore. Per favore, effettua di nuovo l'operazione per il recupero della password.";
            }
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse)
    async sendFormSupport(
        @Arg("fullName") fullName: string,
        @Arg("email") email: string,
        @Arg("subject") subject: string,
        @Arg("message") message: string,
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let errors = [];
        let status = "";

        if (!email.includes("@")) {
            errors.push({
                field: "email",
                message: "Indirizzo email non valido",
            });
        }
        
        if (fullName == "" || fullName == null) {
            errors.push({
                field: "fullName",
                message: "Il campo del nome completo non può essere vuoto",
            });
        }
        
        if (subject == "" || subject == null) {
            errors.push({
                field: "subject",
                message: "Il campo dell'oggetto non può essere vuoto",
            });
        }
        
        if (message == "" || message == null) {
            errors.push({
                field: "message",
                message: "Il campo del messaggio non può essere vuoto",
            });
        } 
        
        if (errors.length === 0) {
            try {
                ejs.renderFile(
                    path.join(
                        __dirname,
                        "../helpers/templates/FormEmail.ejs"
                    ),
                    { 
                        fullName: fullName,
                        email: email,
                        subject: subject,
                        message: message,
                    },
                    function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            transporter.sendMail({
                                from: "EcoPalMaps <support@ecopalmaps.com>",
                                to: process.env.SUPPORT_EMAIL_USER,
                                subject: `${subject}`,
                                html: data,
                            });
                            status =
                                "Il tuo messaggio è stato inviato.";
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                errors.push({
                    field: "email",
                    message:
                        "Non è stato possibile inviare l'email, controlla la tua connessione ad internet",
                });
            }
        }

        return {
            errors,
            status,
        };
    }
}
