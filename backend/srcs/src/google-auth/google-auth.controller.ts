import { Controller, Get } from "@nestjs/common";

@Controller('google-auth')
export class GoogleAuthController {
    
    @Get('google/login')
    handleGoogleLogin() {
        return {msg :'Google auth'}
    }
}