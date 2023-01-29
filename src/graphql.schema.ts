
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserRegistration {
    username: string;
    password: string;
}

export class User {
    id: string;
    username: string;
    password: string;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<UserRegistration>): User | Promise<User>;
}

export abstract class IQuery {
    abstract user(email: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
