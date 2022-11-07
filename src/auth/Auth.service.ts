import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    // login as a user
   async signin(dto: AuthDto){
        /// generate password
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try {
            const User = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                },
                select:{
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            // return the save user
            return User 
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002') throw new ForbiddenException(
                    'credential error'
                )
            }
        }
        
    }

    // create a user
   async signup(dto: AuthDto){
        try {
            // find the user by email
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            // if user does not exist throw an exception
            if(!user) throw new ForbiddenException(' Credentials incorrect')
            // compare the password 
            const pwMatches = await argon.verify(user.hash, dto.password)

            // if password incorrect throw an exception
            if(!pwMatches) throw new ForbiddenException(' Credentials incorrect');
            // send back the user
        return user
        } catch (error) {
            console.log(error)
        }
    }
}