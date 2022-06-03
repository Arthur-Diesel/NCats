import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatService } from './cats.service';
import { CreateCatDto } from './create-cats.dto';

@Controller('/cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getCats() {
    return this.catService.getCats()
  }

  @Post()
  insertCat(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto)
  }
}
