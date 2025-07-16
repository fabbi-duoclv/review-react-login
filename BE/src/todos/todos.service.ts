import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    private usersService: UsersService,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const user = await this.usersService.findOne(createTodoDto.userId);
    
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.completed = createTodoDto.completed || false;
    todo.user = user;
    
    return this.todosRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find({ relations: ['user'] });
  }

  async findByUser(userId: number): Promise<Todo[]> {
    const user = await this.usersService.findOne(userId);
    return this.todosRepository.find({ 
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    
    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }
    
    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }
    
    return this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todosRepository.remove(todo);
  }
} 