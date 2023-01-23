import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpException,
    Post,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { ALREADY_REGISTERED_ERROR } from "./auth.constants";
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Authorization')
@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Registration'})
    @ApiResponse({status: 200})
    @UsePipes(new ValidationPipe())
    @Post("register")
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.authService.findUser(dto.login);
        if (oldUser) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }
        return this.authService.createUser(dto);
    }

    @ApiOperation({summary: 'LogIn'})
    @ApiResponse({status: 200})
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login")
    async login(@Body() {login, password}: AuthDto) {
        const user = await this.authService.validateUser(login, password)
        return this.authService.login(user.email)
    }
}
