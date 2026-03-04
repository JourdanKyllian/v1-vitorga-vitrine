import {
	Controller, Get, Post, Put, Delete,
	Body, Param, Headers, UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Content } from './content.entity';
  
  const ADMIN_TOKEN = 'demo-token';
  
  @Controller('content')
  export class ContentController {
	constructor(
	  @InjectRepository(Content)
	  private repo: Repository<Content>,
	) {}
  
	@Get()
	findAll() {
	  return this.repo.find({ order: { page: 'ASC', position: 'ASC' } });
	}
  
	@Post()
	create(@Headers('authorization') auth: string, @Body() body: Partial<Content>) {
	  this.checkAuth(auth);
	  return this.repo.save(body);
	}
  
	@Put(':id')
	async update(
	  @Headers('authorization') auth: string,
	  @Param('id') id: string,
	  @Body() body: Partial<Content>,
	) {
	  this.checkAuth(auth);
	  await this.repo.update(id, body);
	  return this.repo.findOneBy({ id: Number(id) });
	}
  
	@Delete(':id')
	async remove(@Headers('authorization') auth: string, @Param('id') id: string) {
	  this.checkAuth(auth);
	  await this.repo.delete(id);
	  return { success: true };
	}
  
	private checkAuth(auth: string) {
	  const token = auth?.replace('Bearer ', '');
	  if (token !== ADMIN_TOKEN) throw new UnauthorizedException();
	}
  }