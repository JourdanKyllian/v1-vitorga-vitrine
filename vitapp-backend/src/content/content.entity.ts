import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  page: string;

  @Column()
  type: string;

  @Column()
  position: number;

  @Column('text')
  contenu: string;
}