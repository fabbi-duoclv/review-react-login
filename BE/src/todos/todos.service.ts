import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';

@Injectable()
export class TodosService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    // Verify user exists
    await this.usersService.findOne(createTodoDto.userId);
    
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        completed: createTodoDto.completed || false,
        user: {
          connect: { id: createTodoDto.userId }
        }
      },
      include: {
        user: true
      }
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      include: {
        user: true
      }
    });
  }

  async findByUser(userId: number): Promise<Todo[]> {
    // Verify user exists
    await this.usersService.findOne(userId);
    
    return this.prisma.todo.findMany({
      where: {
        userId: userId
      },
      include: {
        user: true
      }
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      return await this.prisma.todo.update({
        where: { id },
        data: updateTodoDto,
        include: {
          user: true
        }
      });
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.todo.delete({
        where: { id }
      });
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
} 