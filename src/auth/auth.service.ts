import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist';
import { compare, hash } from 'bcryptjs';
import { SignInInput } from './dto/signin.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { uploadImage } from 'src/utils/uploadImage';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signUpInput: SignUpInput) {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: { email: signUpInput.email },
      });
      if (existUser)
        throw new Error('This email has been used by another user!');

      if (signUpInput.password !== signUpInput.confirmPassword)
        throw new Error('Passwords must be the same!');
      const hashedPassword = await hash(
        signUpInput.password,
        parseInt(this.configService.get('AUTH_SALT_ROUND')),
      );
      const user = await this.prisma.user.create({
        data: {
          email: signUpInput.email,
          password: hashedPassword,
        },
      });
      const { accessToken } = await this.createToken(user.id, user.email);
      return { accessToken, user };
    } catch (error) {
      return error;
    }
  }

  async signin(signinInput: SignInInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: signinInput.email },
      });
      if (!user) throw new Error('Wrong credentials');
      const isMatched = await compare(signinInput.password, user.password);
      if (!isMatched) throw new Error('Wrong credentials');
      const { accessToken } = await this.createToken(user.id, user.email);
      return { accessToken, user };
    } catch (error) {
      return error;
    }
  }

  async viewInfo(id: number) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: id } });
      if (!user) throw new Error('User does not exist');
      return { user };
    } catch (error) {
      return error;
    }
  }

  async createToken(userId: number, email: string) {
    try {
      const accessToken = this.jwtService.sign(
        {
          userId,
          email,
        },
        {
          expiresIn: '365d',
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        },
      );

      return { accessToken };
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput, avatar: any) {
    try {
      const updateData: any = {};

      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error('Wrong credentials');
      if (avatar) {
        updateData.avatar = await uploadImage(avatar);
      }

      if (updateUserInput.description) {
        updateData.description = updateUserInput.description;
      }

      if (updateUserInput.dateOfBirth) {
        updateData.dateOfBirth = updateUserInput.dateOfBirth;
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
      return { user: updatedUser };
    } catch (error) {
      return error;
    }
  }
}
