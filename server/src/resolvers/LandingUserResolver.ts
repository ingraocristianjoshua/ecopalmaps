import { LandingUser } from "../entities/LandingUser";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserResponse } from "./UserResolver";
import { getConnection } from "typeorm";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

@Resolver(LandingUser)
export class LandingUserResolver {
    @Query(() => [LandingUser])
    landingUsers() {
        return LandingUser.find({
            order: {
                createdAt: "DESC",
            },
        });
    }

    @Mutation(() => UserResponse)
    async addLandingUser(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("email") email: string,
        @Arg("username") username: string
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let errors = [];

        if (!email.includes("@")) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (username.includes("@")) {
            errors.push({
                field: "username",
                message: "The username field cannot contain @",
            });
        }
        if (username.length <= 2) {
            errors.push({
                field: "username",
                message: "The username lenght must be greater than 2",
            });
        }
        if (firstName == "" || firstName == null) {
            errors.push({
                field: "firstName",
                message: "The first name field cannot be empty",
            });
        }
        if (lastName == "" || lastName == null) {
            errors.push({
                field: "lastName",
                message: "The last name field cannot be empty",
            });
        }

        let status;

        if (errors.length === 0) {
            try {
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(LandingUser)
                    .values({
                        username: username,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                    })
                    .returning("*")
                    .execute();

                ejs.renderFile(
                    path.join(
                        __dirname,
                        "../helpers/templates/WelcomeUser.ejs"
                    ),
                    {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                    },
                    function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            transporter.sendMail({
                                from: "EcoPalMaps <info@ecopalmaps.com>",
                                to: email,
                                subject: "Welcome to EcoPalMaps",
                                html: data,
                            });
                            status =
                                "You are now signed up. You will be notified when the platform is completed.";
                        }
                    }
                );

                ejs.renderFile(
                    path.join(
                        __dirname,
                        "../helpers/templates/NotifyCreator.ejs"
                    ),
                    {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        email: email,
                    },
                    function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            transporter.sendMail({
                                from: "EcoPalMaps <info@ecopalmaps.com>",
                                to: process.env.PERSONAL_EMAIL,
                                subject:
                                    "Another user has signed up to the platform",
                                html: data,
                            });
                        }
                    }
                );
            } catch (error) {
                console.log(error);

                if (error.detail.includes("username")) {
                    errors.push({
                        field: "username",
                        message: "Username already taken",
                    });
                }
                if (error.detail.includes("email")) {
                    errors.push({
                        field: "email",
                        message: "A user using this email already exists",
                    });
                }
            }
        }

        return {
            status,
            errors,
        };
    }
}
