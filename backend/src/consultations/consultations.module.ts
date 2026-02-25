import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConsultationsController } from './consultations.controller';
import { ConsultationsService } from './consultations.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
      },
    }),
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
})
export class ConsultationsModule {}

// Done by Rahul on 20 th Feb