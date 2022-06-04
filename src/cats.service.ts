import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { CatDto } from './cats.dto';
const sql = new Database('sqlite.db', { verbose: console.log });

@Injectable()
export class CatsService {
  async index(): Promise<{id: number, name: string, breed: string, personality: string}[]> | null {
    const data = await sql.prepare("SELECT * FROM cats").all();
    return data
  }
  async store(createCatDto: CatDto): Promise<{changes: number, lastInsertRowid: number}> {
    const data = await sql.prepare(`INSERT INTO cats(name, breed, personality) VALUES ('${createCatDto.name}', '${createCatDto.breed}', '${createCatDto.personality}')`).run();
    return data
  }
  async show(id: string | number): Promise<{id: number, name: string, breed: string, personality: string}> | null {
    id = Number(id)
    const data = await sql.prepare(`SELECT * FROM cats where id = ${id}`).all();
    return data
  }
  async update(id: string | number, updateCatDto: CatDto): Promise<{changes: number, lastInsertRowid: number}> {
    id = Number(id)
    let query = `
    UPDATE cats
    SET
    `
    if(updateCatDto.name){
      query+= `name = '${updateCatDto.name}'`
    }
    if(updateCatDto.breed){
      query+= `breed = '${updateCatDto.breed}'`
    }
    if(updateCatDto.personality){
      query+= `personality = '${updateCatDto.personality}'`
    }
    query+= `WHERE id = ${id}`
    const data = await sql.prepare(query).run();
    return data
  }
  async destroy(id: string | number): Promise<{changes: number, lastInsertRowid: number}> {
    id = Number(id)
    const data = await sql.prepare(`DELETE FROM cats WHERE id = ${id}`).run();
    return data
  }
}
