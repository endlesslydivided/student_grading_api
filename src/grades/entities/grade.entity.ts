import { ApiProperty } from '@nestjs/swagger';
import {
  Default,
  DataType,
  Column,
  ForeignKey,
  Model,
  BelongsTo,
  Table,
} from 'sequelize-typescript';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Table({ timestamps: true })
export class Grade extends Model<Grade> {
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({
    type: DataType.INTEGER({ decimals: 3, precision: 3 }),
    allowNull: true,
  })
  value: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of student',
  })
  @ForeignKey(() => Student)
  @Column({ type: DataType.UUID })
  studentId: string;

  @ApiProperty({ example: 'Math', description: 'ID of subject' })
  @ForeignKey(() => Subject)
  @Column({ type: DataType.UUID })
  subjectId: string;

  @BelongsTo(() => Student, {
    foreignKey: 'studentId',
    constraints: true,
    onDelete: 'set null',
    as: 'student',
  })
  student: Student;

  @BelongsTo(() => Subject, {
    foreignKey: 'subjectId',
    constraints: true,
    onDelete: 'set null',
    as: 'subject',
  })
  subject: Subject;
}
