import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cats.dto';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  listCats() {
    return this.catService.index()
  }

  @Post()
  @HttpCode(201)
  insertCat(@Body() createCatDto: CatDto) {
    return this.catService.store(createCatDto)
  }
  
  @Get(':id')
  showCat(@Param('id') id: string) {
    return this.catService.show(id)
  }

  @Put(':id')
  updateCat(@Param('id') id: string, @Body() updateCatDto: CatDto) {
    return this.catService.update(id, updateCatDto)
  }

  @Delete(':id')
  destroyCat(@Param('id') id: string) {
    return this.catService.destroy(id)
  }

}
