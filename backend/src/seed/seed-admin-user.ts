import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';

async function seedAdminUser() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UserService);

    await userService.createAdminUser();
    await app.close();
}

seedAdminUser()
    .then(() => console.log('Admin user seeded successfully!'))
    .catch((error) => {
        console.error('Failed to seed admin user:', error);
        process.exit(1);
    });