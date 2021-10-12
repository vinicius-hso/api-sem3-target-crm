import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Company from './Company';
import Contact from './Contact';
import Pipeline from './Pipeline';

// interface ActivityInterface {}

@Entity()
class Deals extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Pipeline)
  @JoinColumn()
  pipeline: Pipeline;

  @ManyToOne((type) => Company)
  @JoinColumn()
  company: Company;

  @ManyToOne((type) => Contact)
  @JoinColumn()
  contact: Contact;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'timestamp' })
  deadline: Date;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true, type: 'float'})
  value: number;

  @Column({ type: 'enum', enum: ['INPROGRESS', 'LOST', 'WON', 'ARCHIVED'], default: 'INPROGRESS' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  activity: Array<{
    tag: string;
    name: string;
    description: string;
    createdBy: { id: string; name: string };
    createdAt: Date;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Deals;
