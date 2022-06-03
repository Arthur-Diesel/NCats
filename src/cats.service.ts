import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { CreateCatDto } from './create-cats.dto';
const sql = new Database('sqlite.db', { verbose: console.log });

@Injectable()
export class CatService {
  async getCats(): Promise<{id: number, name: string, breed: string, personality: string}[]> | null {
    const data = await sql.prepare("SELECT * FROM cats").all();
    return data
  }
  async create(createCatDto: CreateCatDto) {
    const data = await sql.prepare(`INSERT INTO cats(name, breed, personality) VALUES ('${createCatDto.name}', '${createCatDto.breed}', '${createCatDto.personality}')`).all();
    return data
  }
}
