import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { ModeWaitlistResolver } from './mode-waitlist.resolver';
import { ModeWaitlistProcessor } from './mode-waitlist.processor';
import { ModeWaitlistService } from './mode-waitlist.service';
import { Queue } from 'bull';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'modeWaitlist',
    }),
  ],
  providers: [ModeWaitlistService, ModeWaitlistResolver, ModeWaitlistProcessor],
  exports: [ModeWaitlistService],
})
export class ModeWaitlistModule implements OnApplicationBootstrap {
  constructor(
    @InjectQueue('modeWaitlist') private readonly modeWaitlistQueue: Queue,
    private readonly modeWaitlistService: ModeWaitlistService
  ) {}

  onApplicationBootstrap() {
    setInterval(() => {
      this.modeWaitlistService.skipTrack({
        channelId: 'cklxztxux02983v5vnhbptj4q',
      });
    }, 5000);
  }
}