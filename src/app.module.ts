import { Module } from '@nestjs/common';
import { CatController } from './cats.controller';
import { CatService } from './cats.service';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [CatService],
})
export class AppModule {}
