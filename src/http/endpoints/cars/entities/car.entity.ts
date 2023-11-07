import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { DateTime } from 'luxon';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cars')
export class CarEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @Column({ name: 'uuid', length: 50, unique: true })
  uuid?: string;

  @IsString()
  @Column({ name: 'brand', length: 100, unique: true })
  brand?: string;

  @IsString()
  @Column({ name: 'model', length: 100 })
  model?: string;

  @IsUrl()
  @Column({ name: 'logo', length: 200 })
  logo?: string;

  @IsUrl()
  @Column({ name: 'image', length: 200 })
  image?: string;

  @IsNumber()
  @Column({ name: 'year' })
  year?: number;

  @IsDate()
  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: DateTime | Date;

  @IsDate()
  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: DateTime | Date;

  @AfterLoad()
  afterLoad() {
    this.id = this.id ? +this.id : undefined;
    this.createdAt = DateTime.fromJSDate(<Date>this.createdAt);
    this.updatedAt = DateTime.fromJSDate(<Date>this.updatedAt);
  }

  @BeforeInsert()
  autogeneratedInsertData() {
    this.createdAt = DateTime.now().toJSDate();
  }

  @BeforeUpdate()
  autogeneratedUpdateData1() {
    this.createdAt = (this.createdAt as DateTime).toJSDate();
  }

  @BeforeUpdate()
  autogeneratedUpdateData2() {
    this.updatedAt = DateTime.now().toJSDate();
  }
}
