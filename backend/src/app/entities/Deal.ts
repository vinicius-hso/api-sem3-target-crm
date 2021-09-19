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

  @Column({ nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true })
  value: number;

  @Column({ type: 'enum', enum: ['COLD', 'HOT', 'WORM'], nullable: true })
  tag: string;

  @Column({ type: 'enum', enum: ['INPROGRESS', 'LOST', 'WON'], default: 'INPROGRESS' })
  status: string;

  @Column({ type: 'jsonb', nullable: true})
  activity: Array<{ type: string; name: string; description: string; status: string; createdBy: string; date: Date, schedule: string }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Deals;
