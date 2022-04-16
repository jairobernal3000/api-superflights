import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const isValidPassword = await this.userService.checkPassword(password, user.password);
    console.log('isValidPassword: ', isValidPassword)
    if (user && isValidPassword) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    console.log('payload: ', payload);
    try {
      const access = await { accessToken: this.jwtService.sign(payload) };
      console.log('access auth1: ',access);
      return access;
    }catch(error){
      console.log('access auth2: ',error);
    }
    
    
    
  }

  async signUp(userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }
}
